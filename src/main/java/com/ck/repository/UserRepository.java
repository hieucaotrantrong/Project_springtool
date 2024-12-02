package com.ck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ck.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Tìm người dùng theo username
    User findByUsername(String username);

    // Tìm người dùng theo username và password
    User findByUsernameAndPassword(String username, String password);
}
