package server.infrastructure;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public final class ConnectionFactory {

    private static final String URL = getEnvOrDefault("DB_URL", "jdbc:mysql://localhost:3306/test");
    private static final String USER = getEnvOrDefault("DB_USER", "root");
    private static final String PASSWORD = getEnvOrDefault("DB_PASSWORD", "usbw");

    private ConnectionFactory() {
    }

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException exception) {
            throw new RuntimeException("Falha ao conectar no .", exception);
        }
    }

     private static String getEnvOrDefault(String key, String defaultValue) {
        String value = System.getenv(key);
        // Verifica se a variável não existe ou se está totalmente em branco
        if (value == null || value.trim().isEmpty()) {
            return defaultValue;
        }
        return value;
    }
}
