package com.ck.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ck.model.User;
import com.ck.service.UserService;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    // Trang đăng nhập
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";  // Trang đăng nhập
    }

    // Xử lý đăng nhập
    @PostMapping("/login")
    public String loginUser(@RequestParam("username") String username,
                            @RequestParam("password") String password, HttpSession session) {
        User user = userService.findByUsernameAndPassword(username, password);
        if (user != null) {
            session.setAttribute("username", username);  // Lưu tên người dùng vào session
            return "redirect:/index";  // Chuyển đến trang chính của bạn
        }
        return "redirect:/login?error";  // Nếu đăng nhập thất bại, quay lại trang login với lỗi
    }

    // Trang đăng ký
    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";  // Trang đăng ký
    }

    // Xử lý đăng ký
    @PostMapping("/register")
    public String registerUser(@RequestParam("username") String username, 
                               @RequestParam("password") String password,
                               @RequestParam("confirmPassword") String confirmPassword) {

        // Kiểm tra nếu người dùng đã tồn tại
        if (userService.findByUsername(username) != null) {
            return "redirect:/register?error=user_exists";  // Nếu có lỗi (username đã tồn tại)
        }

        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (!password.equals(confirmPassword)) {
            return "redirect:/register?error=password_mismatch";  // Nếu mật khẩu không khớp
        }

        // Tạo người dùng mới
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);  // Lưu mật khẩu gốc, chưa mã hóa
        user.setRole("USER");  // Cấp quyền người dùng mặc định
        userService.saveUser(user);

        // Sau khi đăng ký thành công, chuyển hướng về trang đăng nhập
        return "redirect:/login";
    }
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();  // Hủy session khi người dùng nhấn logout
        return "redirect:/login";  // Chuyển hướng về trang login
    }
    // Trang chính (index)
    @GetMapping("/index")
    public String indexPage(HttpSession session) {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (session.getAttribute("username") == null) {
            return "redirect:/login";  // Nếu chưa đăng nhập, chuyển hướng về trang login
        }
        return "index";  // Trả về trang chính của bạn
    }
    

}
