<?php
    class Factura {
        private array $proveidor;
        private array $client;
        private DateTime $data;
        private array $numFactura;
        private array $preu;
        private array $producte;
        private array $cantitat;

        public function __construct() {
            $this->proveidor = ["Audi, S.A", "Ford, S.A", "Ferrari, S.A", "Koenigsegg, S.A"];
            $this->client = ["Jesus de Barqueta", "Pepe Marti", "Julian Alvarez"];
            $this->data = new DateTime();
            $this->numFactura = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            $this->preu = [100000, 500000, 900000, 100000000, 500000000];
            $this->producte = ["Cotxe", "Neumatics", "Chasis", "Aleró"];
            $this->cantitat = [1, 2, 3, 4];
        }

        // Funció que indica qui es el client
        public function posarProveidor(): string {
            return $this->proveidor[array_rand($this->proveidor)];
        }

        // Funció que indica qui es el remitent
        public function posarClient(): string {
            return $this->client[array_rand($this->client)];
        }

        // Funció per a generar un preu aleatori
        public function generarPreu() : int {
            return $this->preu[array_rand($this->preu)];
        }

        // Funció per a generar un producte aleatori
        public function generarProducte(): string {
            return $this->producte[array_rand($this->producte)];
        }

        // Funció per a generar una cantitat aleatoria
        public function generarCantitat(): int {
            return $this->cantitat[array_rand($this->cantitat)];
        }

        // Funció per a generar una factura aleatoria
        public function generarNumFactura(): int {
            return $this->numFactura[array_rand($this->numFactura)];
        }

        // Funció per a calcular el total de la factura
        public function calcularTotal($preu, $cantitat) {
            return $preu * $cantitat;
        }

        public function generarDataActual(): string {
            return $this->data->format('d/m/Y');
        }
    }