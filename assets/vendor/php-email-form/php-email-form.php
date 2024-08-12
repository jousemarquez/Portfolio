<?php

class PHP_Email_Form {
    public $ajax = false;
    public $to = '';
    public $from_name = '';
    public $from_email = '';
    public $subject = '';
    private $messages = [];

    public function add_message($message, $name = '', $priority = 0) {
        $this->messages[$priority][] = ['name' => $name, 'message' => $message];
    }

    public function send() {
        // Basic validation
        if (empty($this->to) || empty($this->from_name) || empty($this->from_email) || empty($this->subject) || empty($this->messages)) {
            return false;
        }

        // Build the email
        $headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
        $headers .= "Reply-To: " . $this->from_email . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $message_body = "<html><body>";
        foreach ($this->messages as $priority => $messages) {
            foreach ($messages as $msg) {
                $message_body .= "<p><strong>" . htmlspecialchars($msg['name']) . ":</strong> " . nl2br(htmlspecialchars($msg['message'])) . "</p>";
            }
        }
        $message_body .= "</body></html>";

        return mail($this->to, $this->subject, $message_body, $headers);
    }
}
