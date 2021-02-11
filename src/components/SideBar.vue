<template>
    <div class="sidebar">
        <div class="sidebar-logo"></div>
        <ul>
            <li><router-link to = "/" exact class="router-link"><i class="fas fa-home mr-1"></i>Dashboard</router-link></li>
            <li><router-link to = "/supplies" exact class="router-link"><i class="fas fa-boxes mr-1"></i>Insumos</router-link></li>
            <!--
            <li><i class="fas fa-users"></i>Clientes</li>
            <li><i class="fas fa-pizza-slice"></i>Produtos</li> -->
        </ul>
    </div>
</template>