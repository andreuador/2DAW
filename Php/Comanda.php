<?php
    class Comanda {
        private array $vehicles;
        private array $codiComanda;
        private array $estat;

        public function __construct() {
            $this->vehicles = ["Ferrari", "Aston Martin", "Bugatti", "Mclaren", "Bentley"];
            $this->codiComanda = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $this->estat = ["Nou", "Seminou"];
        }

        public function afegirVehicles(): string {
            return $this->vehicles[array_rand($this->vehicles)];
        }

        public function generarCodi(): int {
            return $this->codiComanda[array_rand($this->codiComanda)];
        }

        public function generarEstat(): string {
            return $this->estat[array_rand($this->estat)];
        }
    }
?>