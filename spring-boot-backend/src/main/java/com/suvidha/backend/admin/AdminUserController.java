package com.suvidha.backend.admin;

import com.suvidha.backend.auth.Role;
import com.suvidha.backend.auth.User;
import com.suvidha.backend.auth.UserRepository;
import com.suvidha.backend.auth.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<UserResponse> getUsers(@AuthenticationPrincipal User user) {
        requireAdmin(user);
        return userRepository.findAll().stream().map(UserResponse::from).toList();
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        requireAdmin(user);
        return userRepository.findById(id)
            .map(UserResponse::from)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PutMapping("/{id}/role")
    public UserResponse changeRole(@PathVariable UUID id,
                                   @AuthenticationPrincipal User user,
                                   @RequestBody RoleUpdateRequest request) {
        requireAdmin(user);
        User target = userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Role role = Role.fromValue(request.role());
        target.setRole(role);
        target.getRoles().add(role);
        return UserResponse.from(userRepository.save(target));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        requireAdmin(user);
        userRepository.deleteById(id);
    }

    private void requireAdmin(User user) {
        if (user == null || !user.getRoles().contains(Role.ADMIN)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin access required");
        }
    }

    public record RoleUpdateRequest(String role) {
    }
}
