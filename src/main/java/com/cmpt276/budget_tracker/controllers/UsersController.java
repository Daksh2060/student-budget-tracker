package com.cmpt276.budget_tracker.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cmpt276.budget_tracker.models.Budget;
import com.cmpt276.budget_tracker.models.BudgetRepository;
import com.cmpt276.budget_tracker.models.Users;
import com.cmpt276.budget_tracker.models.UsersRepository;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class UsersController {
    
    @Autowired
    private UsersRepository userRepo;

    
    @Autowired
    private BudgetRepository budgetRepo;

    @GetMapping("/users/view")
    public String getAllUsers(Model model) {
        System.out.println("Getting all users");
        // get all users from database
        List<Users> users = userRepo.findAll();

        // end of database call
        model.addAttribute("us", users);
        return "users/showAll";
    }
  
    @PostMapping(value="/users/add")
    public String addUser(@RequestParam("username") String newName, @RequestParam("password") String newPwd, @RequestParam("email") String newEmail, Model model, HttpServletResponse response) {
    
        if (userRepo.findByEmail(newEmail).isPresent()) {
            model.addAttribute("errorMessage", "Error: Email is already registered.");
            return "users/addError";
        }
    
        if (userRepo.findByUsername(newName).isPresent()) {
            model.addAttribute("errorMessage", "Error: Username is already taken.");
            return "users/addError";
        }

    userRepo.save(new Users(newName, newPwd, newEmail));
    response.setStatus(HttpServletResponse.SC_CREATED);
    return "users/addedUser";   
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,
                    @RequestParam("password") String password,
                    HttpSession session, Model model) {
    Optional<Users> user = userRepo.findByUsername(username);
    
    if(user.isPresent() && user.get().getPassword().equals(password)) {
        session.setAttribute("user", user.get());
        return "users/indexAfterLogin";
    } else {
        model.addAttribute("loginError", "Invalid username or password.");
        return "users/login";
    }
}

@GetMapping("/login")
public String showLoginForm() {
    return "users/login"; 

}

@PostMapping("/users/saveBudget")
public String saveUserBudget(
    HttpSession session,
    @RequestParam Map<String, String> allParams,
    Model model
) {
    Users user = (Users) session.getAttribute("user");
    if (user == null) {
        return "users/login";
    }

    for (Map.Entry<String, String> entry : allParams.entrySet()) {
        String category = entry.getKey();
        double amount = Double.parseDouble(entry.getValue());
        
        Budget budget = new Budget();
        budget.setUser(user);
        budget.setCategory(category);
        budget.setAmount(amount);
        budgetRepo.save(budget);
    }

    return "users/budgetSaved";
}


}


