FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["backend/ContactApi/ContactApi.csproj", "backend/ContactApi/"]
RUN dotnet restore "backend/ContactApi/ContactApi.csproj"
COPY . .
WORKDIR "/src/backend/ContactApi"
RUN dotnet build "ContactApi.csproj" - c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContactApi.csproj" - c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "ContactApi.dll" ]