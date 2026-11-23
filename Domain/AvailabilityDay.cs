using AskDate.Domain.Entities;

namespace AskDate.Domain;

/// <summary>
/// One member's marks for one day, kept free of overlaps on a per-minute line.
/// Neighbouring marks of the same type merge, and a newer mark overrides the other type
/// where they intersect ("busy 9–12" painted over "free 10–14" leaves "free 12–14").
/// An erased area unmarks its own type only, so a mark may be cut in two.
/// </summary>
public static class AvailabilityDay
{
    public const int Minutes = 24 * 60;

    private const byte None = 0;
    // The values equal AvailabilityType, which lets a line be scanned without mapping
    private const byte Free = (byte)AvailabilityType.Free;
    private const byte Busy = (byte)AvailabilityType.Busy;

    /// <summary>
    /// A mark on a day. Both bounds null: the whole day. A start without an end: from the start
    /// until the end of the day (TimeOnly cannot express 24:00).
    /// </summary>
    public readonly record struct Span(AvailabilityType Type, TimeOnly? Start, TimeOnly? End)
    {
        public bool IsWholeDay => Start is null && End is null;

        public static Span WholeDay(AvailabilityType type) => new(type, null, null);
    }

    /// <exception cref="ArgumentException">The bounds are malformed.</exception>
    public static void Validate(Span span)
    {
        if (span.Start is null)
        {
            if (span.End is not null)
                throw new ArgumentException("A mark without a start covers the whole day and must not have an end.", nameof(span));
            return;
        }
        if (span.End is not null && span.End.Value <= span.Start.Value)
            throw new ArgumentException("The end of an interval must be later than its start.", nameof(span));
    }

    /// <summary>
    /// Paints the marks (in order) and the optional new one onto a fresh line, then wipes the
    /// marks of the erased span's type where it lies ("busy 9–12" erased with "10–14" leaves
    /// "busy 9–10"; the other type is not touched).
    /// </summary>
    public static byte[] Paint(IEnumerable<Span> spans, Span? added, Span? erased)
    {
        var line = new byte[Minutes];
        foreach (var span in spans) Paint(line, span);
        if (added is not null) Paint(line, added.Value);
        if (erased is not null) Erase(line, erased.Value);
        return line;
    }

    private static void Paint(byte[] line, Span span)
    {
        Validate(span);
        Bounds(span, out var from, out var to);
        Array.Fill(line, span.Type == AvailabilityType.Busy ? Busy : Free, from, to - from);
    }

    private static void Erase(byte[] line, Span span)
    {
        Validate(span);
        Bounds(span, out var from, out var to);
        byte value = span.Type == AvailabilityType.Busy ? Busy : Free;
        for (int minute = from; minute < to; minute++)
        {
            if (line[minute] == value) line[minute] = None;
        }
    }

    // The whole day without bounds; a start without an end runs until midnight
    private static void Bounds(Span span, out int from, out int to)
    {
        from = span.Start is null ? 0 : ToMinute(span.Start.Value);
        to = span.End is null ? Minutes : ToMinute(span.End.Value);
    }

    /// <summary>Reads a line back into whole-day marks and intervals, in chronological order.</summary>
    public static List<Span> Extract(byte[] line)
    {
        var spans = new List<Span>();
        int index = 0;
        while (index < Minutes)
        {
            // skip the unmarked stretches
            while (index < Minutes && line[index] == None) index++;
            if (index == Minutes) break;

            byte value = line[index];
            int start = index;
            while (index < Minutes && line[index] == value) index++;

            var type = (AvailabilityType)value;
            spans.Add(start == 0 && index == Minutes
                ? Span.WholeDay(type)
                : new Span(type, AtMinute(start), index == Minutes ? null : AtMinute(index)));
        }
        return spans;
    }

    // index < Minutes is guaranteed by the caller, so the value always fits into a TimeOnly
    private static TimeOnly AtMinute(int minute) => TimeOnly.FromTimeSpan(TimeSpan.FromMinutes(minute));

    private static int ToMinute(TimeOnly time) => time.Hour * 60 + time.Minute;
}
