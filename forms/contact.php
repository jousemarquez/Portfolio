<?php
  require_once __DIR__ . '/vendor/autoload.php';
  use Dotenv\Dotenv;

  $receiving_email_address = $_ENV['MAIL'];
  $php_email_form_path = '../assets/vendor/php-email-form/php-email-form.php';

  if (file_exists($php_email_form_path)) {
    include($php_email_form_path);
  } else {
    die('Unable to load the "PHP Email Form" Library!');
  }

  if (!class_exists('PHP_Email_Form')) {
    die('Class "PHP_Email_Form" not found');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;

  // Sanitize and validate input
  if (!isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {
      die('Required fields are missing');
  }

  $name = htmlspecialchars(trim($_POST['name']));
  $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
  $subject = htmlspecialchars(trim($_POST['subject']));
  $message = htmlspecialchars(trim($_POST['message']));

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      die('Invalid email format');
  }

  $contact->to = $receiving_email_address;
  $contact->from_name = $name;
  $contact->from_email = $email;
  $contact->subject = $subject;

  $contact->add_message($name, 'From');
  $contact->add_message($email, 'Email');
  $contact->add_message($message, 'Message', 10);

  if (!$contact->send()) {
      die('Failed to send email. Please try again later.');
  }

  echo 'Message sent successfully';
