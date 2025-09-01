package com.ucig.fuelpass.Controllers;

import com.ucig.fuelpass.Forms.FormGenerator;
import com.ucig.fuelpass.Models.Order;
import com.ucig.fuelpass.Requests.CreateOrderRequest;
import com.ucig.fuelpass.Requests.OrderStatusRequest;
import com.ucig.fuelpass.repositories.OrderRepo;
import com.ucig.fuelpass.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@Validated
public class OrderController {


    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest createOrderRequest){
        Order res = orderService.createOrder(createOrderRequest);
        int status = 201;
        if(res == null)
            status = 400;
        return ResponseEntity.status(status).body(res);
    }

    @GetMapping("/")
    public  ResponseEntity<List<Order>> getOrders(){
        return ResponseEntity.ok(orderService.getOrders());
    }

    @PutMapping("/{orderId}/changeStatus")
    public ResponseEntity<Order> changeOrderStatus(@PathVariable UUID orderId, @RequestBody OrderStatusRequest orderStatusRequest){
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, orderStatusRequest));
    }

    @GetMapping("/requestForm")
    public ResponseEntity<List> getRequestForm(){
        FormGenerator formGenerator =  new FormGenerator();
        List<Map<String,Object>> out = formGenerator.generateForm(Order.class);
        return ResponseEntity.ok(out);
    }
}
