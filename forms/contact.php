<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validar los datos (puedes agregar más validaciones según sea necesario)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo 'Email no válido';
        exit;
    }

    // Crear el correo electrónico
    $to = 'dummyinlaravel@gmail.com';  // Reemplaza con tu dirección de correo electrónico
    $email_subject = "Nuevo mensaje de: $name - $subject";
    $email_body = "Has recibido un nuevo mensaje.\n\n".
                  "Detalles:\n\n".
                  "Nombre: $name\n".
                  "Correo: $email\n".
                  "Asunto: $subject\n".
                  "Mensaje:\n$message";

    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";

    // Enviar el correo
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo 'success';
    } else {
        echo 'Error al enviar el correo';
    }
} else {
    echo 'Método no permitido';
}
?>
