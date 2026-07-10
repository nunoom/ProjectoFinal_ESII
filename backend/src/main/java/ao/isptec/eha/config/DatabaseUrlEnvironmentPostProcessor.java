package ao.isptec.eha.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Converte a variável DATABASE_URL — no formato postgres://user:pass@host:port/db
 * usado por Railway, Render, Heroku e Neon — para as propriedades JDBC do Spring.
 *
 * Só atua quando DATABASE_URL existe e é uma ligação PostgreSQL, escrevendo
 * spring.datasource.url/username/password com prioridade máxima. Assim, para
 * ligar a BD basta definir uma única variável (DATABASE_URL) no host, sem ter
 * de construir a URL JDBC nem separar credenciais à mão.
 *
 * Se DATABASE_URL não existir, não faz nada — a configuração normal
 * (SPRING_DATASOURCE_* ou EHA_DB_*) continua a funcionar como antes.
 */
public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String databaseUrl = environment.getProperty("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.isBlank()) {
            return;
        }
        if (!databaseUrl.startsWith("postgres://") && !databaseUrl.startsWith("postgresql://")) {
            return;
        }

        try {
            URI uri = new URI(databaseUrl);

            String user = "";
            String password = "";
            String userInfo = uri.getUserInfo();
            if (userInfo != null) {
                String[] parts = userInfo.split(":", 2);
                user = parts[0];
                password = parts.length > 1 ? parts[1] : "";
            }

            int port = uri.getPort() > 0 ? uri.getPort() : 5432;
            String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();
            if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                jdbcUrl += "?" + uri.getQuery();
            }

            Map<String, Object> props = new HashMap<>();
            props.put("spring.datasource.url", jdbcUrl);
            props.put("spring.datasource.username", user);
            props.put("spring.datasource.password", password);
            props.put("spring.datasource.driver-class-name", "org.postgresql.Driver");
            // Nota: o perfil "postgres" deve estar ativo (Dockerfile define
            // SPRING_PROFILES_ACTIVE=postgres) para usar ddl-auto=update.

            environment.getPropertySources().addFirst(new MapPropertySource("databaseUrl", props));
        } catch (Exception e) {
            // Parse falhou — deixa a configuração normal tratar da ligação
        }
    }
}
