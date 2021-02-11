<template>
    <div class="header">
        <div class="user-menu">
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <div aria-haspopup="true" aria-controls="user-menu">
                        <i class="fa fa-user mr-1"></i>
                        <span>Arthur Brito</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="dropdown-menu has-text-right" id="user-menu" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            <ul class="dropdown-ul">
                                <li class="dropdown-li"><a href="#" class="dropdown-link"><i class="fa fa-cog mr-2"></i>Perfil</a></li>
                                <li class="dropdown-li"><router-link to = "/logout" exact ><a href="#" class="dropdown-link"><i class="fa fa-sign-out-alt mr-2"></i>Log Out</a></router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>
