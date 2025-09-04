package com.ucig.fuelpass.controllers;

import com.ucig.fuelpass.dtos.OrderDTO;
import com.ucig.fuelpass.forms.FormGenerator;
import com.ucig.fuelpass.models.Order;
import com.ucig.fuelpass.models.User;
import com.ucig.fuelpass.requests.CreateOrderRequest;
import com.ucig.fuelpass.requests.OrderStatusRequest;
import com.ucig.fuelpass.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@Validated
public class OrderController {


    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    @ResponseBody
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest createOrderRequest, @AuthenticationPrincipal User user){
        Order res = orderService.createOrder(createOrderRequest, user);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/")
    @ResponseBody
    public  ResponseEntity<List<OrderDTO>> getOrders(@AuthenticationPrincipal User user){
        List<OrderDTO> orderDTOS = orderService.getOrders();
        return ResponseEntity.ok(orderDTOS);
    }

    @PutMapping("/{orderId}/changeStatus")
    @ResponseBody
    public ResponseEntity<OrderDTO> changeOrderStatus(@AuthenticationPrincipal User user, @PathVariable String orderId, @RequestBody OrderStatusRequest orderStatusRequest){
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, orderStatusRequest, user));
    }

    @GetMapping("/requestForm")
    @ResponseBody
    public ResponseEntity<List> getRequestForm(){
        FormGenerator formGenerator =  new FormGenerator();
        List<Map<String,Object>> out = formGenerator.generateForm(Order.class);
        return ResponseEntity.ok(out);
    }
}
