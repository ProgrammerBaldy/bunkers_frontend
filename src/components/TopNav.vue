<template>
  <div class="header">
    <div class="left-side"></div>
    <div class="user-menu">
      <div class="user-menu-body">
        <i class="fa fa-user"></i>
        <div class="username">
          <span>Arthur Brito</span>
        </div>
        <i class="fa fa-caret-down"></i>
      </div>
      <div class="dropdown">
        <div class="dropdown-content">
          <div>
            <ul class="user-options">
              <li class="link"><i class="fa fa-cog"></i>Perfil</li>
              <li class="link">
                <i class="fa fa-sign-out-alt"></i
                ><router-link to="/logout" exact>Log Out</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.header {
  background: url("../assets/cimento_arthur.jpeg");
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.user-menu {
  font-size: 16px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 23px;
}
.user-menu-body {
  display: flex;
  flex-direction: row;
  color: #717171;
}
.user-menu-body:hover {
  color: inherit;
}
.username {
  margin-right: 1px;
  margin-left: 5px;
}
.user-menu:hover .user-menu-body {
  display: flex;
  color: #000000;
}
.user-menu:hover {
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: flex;
  width: 100%;
  z-index: 2;
}
.dropdown-content {
  background: url("../assets/cimento_arthur.jpeg");
  display: none;
  position: absolute;
  border-radius: 5px;
}
.dropdown-content li {
  list-style: none;
  font-size: 14px;
}
.user-menu:hover .dropdown-content {
  display: flex;
}
.user-menu:hover .dropdown-content .user-options {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 0px;
  padding-right: 20px;
  margin-right: 10px;
}
.link {
  color: #717171;
  text-decoration: none !important;
}
.link:hover {
  color: #000000;
}
a {
  text-decoration: none;
  color: inherit;
}
.link {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 4px;
}

.link:last-child {
  border-bottom: none;
  margin-bottom: 0px;
}
</style>
