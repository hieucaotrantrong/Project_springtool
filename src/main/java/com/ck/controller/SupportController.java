package com.ck.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import com.ck.model.SupportRequest;


import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class SupportController {

    @GetMapping("/support")
    public String showSupportPage(Model model) {
        model.addAttribute("supportRequest", new SupportRequest());
        return "support"; // Tên file HTML
    }

    @PostMapping("/support")
    public String handleSupportRequest(@ModelAttribute("supportRequest") SupportRequest request, Model model) {
        // Xử lý logic (Gửi email, lưu database...)
        System.out.println("Received support request:");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Message: " + request.getMessage());

        // Gửi email (nếu cần)
        model.addAttribute("successMessage", "Your support request has been sent successfully!");
        return "support";
    }
}
