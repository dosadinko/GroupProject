<?php

class expence
{
    private $id;
    private $description;
    private $payee;
    private $amount_payed;
    private $currency_type;
    private $expence_date;
    private $payed_date;

    public function getId(){
        return $this->id;
    }

    public function setDescription($description){
    $this->description = $description;
}

    public function getDescription(){
        return $this->description;
    }

    public function setPayee($payee){
    $this->payee = $payee;
}

    public function getPayee(){
        return $this->payee;
    }

    public function setAmountPayed($ap){
        $this->amount_payed= $ap;
    }

    public function getAmountPayed(){
        return $this->amount_payed;
    }

    public function setCurrencyType($ct){
        $this->currency_type = $ct;
    }

    public function getCurrencyType(){
        return $this->currency_type;
    }

    public function setExpenceDate($ed){
        $this->expence_date = $ed;
    }

    public function getExpenceDate(){
        return $this->expence_date;
    }

    public function setPayedDate($pd){
        $this->payed_date = $pd;
    }

    public function getPayedDate(){
        return $this->payed_date;
    }
}