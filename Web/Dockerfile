FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
WORKDIR /src/Web
RUN dotnet restore "AskDate.Web.csproj"
RUN dotnet build "AskDate.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AskDate.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AskDate.Web.dll"]
