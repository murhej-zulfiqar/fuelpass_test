package com.ucig.fuelpass.annotations;

import com.ucig.fuelpass.Enums.FieldType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.List;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FormField {
    FieldType type() default FieldType.TEXT;
    String label() default "";
    boolean required() default false;
    int order() default 0;
    String[] options() default {};
    String[] validations() default {};
    String placeholder() default "";

    String name() default "";
}
