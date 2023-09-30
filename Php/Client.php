<?php
    class Client {
        private array $nomClient;
        private array $nomUsuari;
        private array $email;
        private string $dni;
        private array $direccio;
        private string $targeta;


        public function __construct() {
            $this->nomClient=["Pedro","Manolo","Pepito","Juan","Antonio","Luís"];
            $this->nomUsuari=["Tron","Machupichu","Pepinillo","Slash","Slim","Alfalfa"];
            $this->email=["a@gmail.com","b@gmail.com","c@gmail.com","d@gmail.com","d@gmail.com","e@gmail.com"];
            $this->dni= $this->crearDNI();
            $this->direccio=["La Vega","Fontanejos","Alcala","Puerta del Sol","Les Fonts","Brooklin"];
            $this->targeta=rand(000000000000,999999999999);
        }

        public function crearDNI() {
            return $this->randNums(8) . $this->randLetter(1);
        }

        public function generarNom(): string {
            return $this->nomClient[array_rand($this->nomClient)];
        }

        public function generarUsuari(): string {
            return $this->nomUsuari[array_rand($this->nomUsuari)];
        }

        public function generarEmail(): string {
            return $this->email[array_rand($this->email)];
        }

        public function generarDNI(): string {
            return $this->dni;
        }

        public function generarDireccio(): string {
            return $this->direccio[array_rand($this->direccio)];
        }

        public function generarTargeta(): string {
            return $this->targeta;
        }

        //Genera Els numeros i la lletra de dni
        public function randNums($i): string {
            return rand(00000000,99999999);
        }

        public function randLetter($i): string {
            $lletres = chr(rand(65,90));
            return $lletres;
        }
    }
?>