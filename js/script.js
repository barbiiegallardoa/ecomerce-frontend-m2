// Función para guardar en el carrito
document.addEventListener("DOMContentLoaded", function() {
    
    // Si estamos en index.html
    if(document.querySelector(".btn-agregar")) {
        const botones = document.querySelectorAll("#productos .btn-agregar");
        const numeroCarrito = document.getElementById("contador-carrito");

        botones.forEach(boton => {
            boton.addEventListener("click", function() {
                
                // Tomamos los datos del producto
                let tarjeta = this.parentElement;
                let nombre = tarjeta.querySelector("h3").innerText;
                let precio = tarjeta.querySelector(".precio").innerText;
                let imagen = tarjeta.querySelector("img").src;

                // Creamos un objeto
                let producto = {
                    nombre: nombre,
                    precio: precio,
                    imagen: imagen
                };

                // Lo guardamos en la memoria del navegador
                let carrito = [];
                if(localStorage.getItem("carrito")) {
                    carrito = JSON.parse(localStorage.getItem("carrito"));
                }
                carrito.push(producto);
                localStorage.setItem("carrito", JSON.stringify(carrito));

                // Actualizamos el número
                if(numeroCarrito) {
                    numeroCarrito.innerText = carrito.length;
                }

                alert("✅ Producto agregado!");
            });
        });

        // Mostramos el número al cargar
        if(numeroCarrito) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            numeroCarrito.innerText = carrito.length;
        }
    }


    // Si estamos en carrito.html
    if(document.getElementById("lista-productos")) {
        
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let contenedor = document.getElementById("lista-productos");

        if(carrito.length === 0) {
            contenedor.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
        } else {
            carrito.forEach(producto => {
                let div = document.createElement("div");
                div.className = "item-carrito";
                div.innerHTML = `
                    <img src="${producto.imagen}" width="80" height="80" style="object-fit:cover; border-radius:8px;">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p>${producto.precio}</p>
                    </div>
                `;
                contenedor.appendChild(div);
            });
        }
    }

});