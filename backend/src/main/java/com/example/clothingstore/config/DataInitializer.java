package com.example.clothingstore.config;

import com.example.clothingstore.user.User;
import com.example.clothingstore.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) {
        // Khởi tạo hoặc cập nhật mật khẩu chuẩn xác cho Admin
        userRepository.findByEmail("admin@luxeatelier.com").ifPresentOrElse(
                admin -> {
                    admin.setPassword(passwordEncoder.encode("admin123"));
                    admin.setRole("ROLE_ADMIN");
                    userRepository.save(admin);
                    log.info("Default Admin account verified (admin@luxeatelier.com / admin123)");
                },
                () -> {
                    User admin = User.builder()
                            .fullName("Quản Trị Viên (Admin)")
                            .email("admin@luxeatelier.com")
                            .password(passwordEncoder.encode("admin123"))
                            .phone("0901234567")
                            .role("ROLE_ADMIN")
                            .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80")
                            .isActive(true)
                            .build();
                    userRepository.save(admin);
                    log.info("Default Admin account created (admin@luxeatelier.com / admin123)");
                }
        );

        // Khởi tạo hoặc cập nhật mật khẩu chuẩn xác cho Customer
        userRepository.findByEmail("customer@gmail.com").ifPresentOrElse(
                customer -> {
                    customer.setPassword(passwordEncoder.encode("customer123"));
                    customer.setRole("ROLE_CUSTOMER");
                    userRepository.save(customer);
                    log.info("Default Customer account verified (customer@gmail.com / customer123)");
                },
                () -> {
                    User customer = User.builder()
                            .fullName("Nguyễn Minh Anh")
                            .email("customer@gmail.com")
                            .password(passwordEncoder.encode("customer123"))
                            .phone("0912345678")
                            .role("ROLE_CUSTOMER")
                            .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80")
                            .isActive(true)
                            .build();
                    userRepository.save(customer);
                    log.info("Default Customer account created (customer@gmail.com / customer123)");
                }
        );
    }
}
