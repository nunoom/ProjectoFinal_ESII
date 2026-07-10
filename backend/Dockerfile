# --- Etapa 1: build do JAR com Maven + JDK 17 ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B -DskipTests clean package

# --- Etapa 2: imagem final leve, só com o JRE ---
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/eha-backend-1.0.0.jar app.jar

# Perfil de produção por omissão (PostgreSQL). A porta vem do host ($PORT no
# Railway/Render); fica 8080 se não for definida.
ENV SPRING_PROFILES_ACTIVE=postgres
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
