function categorias() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white">Nuestras categorias</h5>';
    const FAKESTORE_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories';

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Categorias:', data);

            let listCategoria = `
            <div class="table-responsive">
                <table class="table table-striped table-hover border-success">
                    <thead class="table-success text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>`;

            data.forEach(element => {
                listCategoria += `
                    <tr>
                        <td>${element.id}</td>
                        <td class="fw-bold text-success">${element.name}</td> 
                        <td class="text-primary">$${element.slug}</td>
                        
                        <td>
                            <img src="${element.image}" class="img-thumbnail rounded shadow-sm" style="width: 60px;" alt="Imagen del producto">
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="getCategoria(${element.id})">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>`;
            });

            listCategoria += `
                    </tbody>
                </table>
            </div>`;

            document.getElementById('info').innerHTML = listCategoria;
        })
        .catch(error => {
            console.error('Error al obtener las categorias:', error);
            document.getElementById('info').innerHTML = '<p class="text-danger">Error al cargar categorias</p>';
        });
}

function getCategoria(idCategoria) {
    const FAKESTORE_ENDPOINT = `https://api.escuelajs.co/api/v1/products/${idCategoria}`;

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Producto:', data);
            
            const modalCategoria = `
            <div class="modal fade" id="modalCategoria" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Detalles del Producto</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="card shadow-sm border-success">
                                <img src="${data.image}" class="card-img-top rounded mx-auto mt-3" style="width: 200px;" alt="Imagen del producto">
                                <div class="card-body">
                                    <h5 class="card-title text-success">${data.name}</h5>
                                    <p class="card-text"><strong>Precio:</strong> $${data.slug.toFixed(2)}</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById('viewModal').innerHTML = modalCategoria;
            const modal = new bootstrap.Modal(document.getElementById('modalCategoria'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener la categoria:', error);
            document.getElementById('info').innerHTML = '<h3 class="text-danger">No se encontró la categoria en la API</h3>';
        });
}
