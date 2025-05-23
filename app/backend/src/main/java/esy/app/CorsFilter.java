package esy.app;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * CORS filter to handle cross-origin requests, especially for GitHub Codespaces.
 * This filter ensures CORS headers are applied even to redirects and error responses.
 */
@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    private static final List<String> ALLOWED_ORIGIN_PATTERNS = Arrays.asList(
        "https://*.app.github.dev", // Github Codespaces
        "https://localhost",        // local Kubernetes
        "http://localhost:*"        // local Development
    );

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String origin = httpRequest.getHeader("Origin");
        
        // Check if origin matches any of our allowed patterns
        if (origin != null && isOriginAllowed(origin)) {
            log.debug("Adding CORS headers for origin: {}", origin);
            
            // Set CORS headers
            httpResponse.setHeader("Access-Control-Allow-Origin", origin);
            httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
            httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
            httpResponse.setHeader("Access-Control-Allow-Headers", "*");
            httpResponse.setHeader("Access-Control-Expose-Headers", "*");
            httpResponse.setHeader("Access-Control-Max-Age", "3600");
            
            // Handle preflight requests
            if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
                httpResponse.setStatus(HttpServletResponse.SC_OK);
                return;
            }
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean isOriginAllowed(String origin) {
        if (origin == null) {
            return false;
        }
        
        return ALLOWED_ORIGIN_PATTERNS.stream().anyMatch(pattern -> {
            if (pattern.contains("*")) {
                // Convert wildcard pattern to regex
                String regex = pattern.replace("*", ".*");
                return origin.matches(regex);
            } else {
                // Exact match or with port
                return origin.equals(pattern) || origin.startsWith(pattern + ":");
            }
        });
    }
}
