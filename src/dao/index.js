import cartsDAO from "./carritoDAO";
import productsDAO from "./productsDAO";
import UserDAO from "./userDAO";

export const userService = new UserDAO();
export const productsService = new productsDAO();
export const cartsService = new cartsDAO();