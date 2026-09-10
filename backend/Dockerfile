# ===================================================
# Dockerfile for Umm Reham .NET 8 API (Backend directory context)
# ===================================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["src/UmmReham.Domain/UmmReham.Domain.csproj", "UmmReham.Domain/"]
COPY ["src/UmmReham.Application/UmmReham.Application.csproj", "UmmReham.Application/"]
COPY ["src/UmmReham.Infrastructure/UmmReham.Infrastructure.csproj", "UmmReham.Infrastructure/"]
COPY ["src/UmmReham.API/UmmReham.API.csproj", "UmmReham.API/"]

RUN dotnet restore "UmmReham.API/UmmReham.API.csproj"

# Copy full source and build
COPY src/ .
WORKDIR "/src/UmmReham.API"
RUN dotnet publish "UmmReham.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 10000
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:10000;http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "UmmReham.API.dll"]
