package com.clinica.clinic_backend.config;

import com.stripe.Stripe;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {

    private String stripeApiKey = "sk_test_51QhgcJQFvfgoN0hfq0jUfJXiWLrOnfDn2HrmifDoGZYgkHG2gtNhSX7wexKEcwKrJGbO7bP7NjZhXjMdfnNu1W7300x23MiuNp";

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }
}
