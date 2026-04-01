<?php

namespace App\Exceptions;

use Exception;

class InsufficientEnergyException extends Exception
{
    public function __construct(
        string $message = 'Sua energia acabou. Aguarde a recarga para iniciar outra licao.',
        public readonly ?string $nextRechargeAt = null,
    ) {
        parent::__construct($message);
    }
}
