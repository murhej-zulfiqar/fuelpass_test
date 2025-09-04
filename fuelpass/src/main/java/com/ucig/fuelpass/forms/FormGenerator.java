package com.ucig.fuelpass.forms;

import com.ucig.fuelpass.annotations.FormField;

import java.lang.reflect.Field;
import java.util.*;

public class FormGenerator {

    /**
     * a method to generate the form depending on the passed model
     * loop over the fields of the model and check for each field if the FormField Annotation
     * using the Annotation we can get the required info for the form field and the validation
     *
     * @param model
     * @return
     */
    public List<Map<String, Object>> generateForm(Class<?> model){
        List<Map<String, Object>> generatedFields = new ArrayList<>();
        Field []fields = model.getDeclaredFields();
        for (Field field:fields) {
            if(field.isAnnotationPresent(FormField.class)){
                Map<String,Object> f= new HashMap<>();
                FormField formField = field.getAnnotation(FormField.class);
                f.put("fieldName", formField.name());
                f.put("fieldLabel", formField.label());
                f.put("fieldType", formField.type());
                Map<String,Object> validationMap = new HashMap<>();
                validationMap.put("required", formField.required());
                for (String validation : formField.validations()) {
                    String[] parts = validation.split(":");
                    validationMap.put(parts[0], parts[1]);
                }
                f.put("validation", validationMap);
                generatedFields.add(f);
            }

        }
        return generatedFields;
    }
}
