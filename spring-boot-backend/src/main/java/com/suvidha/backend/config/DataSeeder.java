package com.suvidha.backend.config;

import com.suvidha.backend.auth.Role;
import com.suvidha.backend.auth.User;
import com.suvidha.backend.auth.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.EnumSet;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUser("admin@suvidha.com", "Admin User", "admin123", Role.ADMIN);
        seedUser("support@suvidha.com", "Support User", "support123", Role.SUPPORT);
    }

    private void seedUser(String email, String name, String password, Role role) {
        if (userRepository.findByEmailIgnoreCase(email).isPresent()) {
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setRoles(EnumSet.of(role));
        user.setVerified(true);
        userRepository.save(user);
    }
}
