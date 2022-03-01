function pesquisarUser() {
			var name = $('#searchName').val()

			if (name != null && name.trim() != '') {
				$
						.ajax(
								{
									method : 'GET',
									url : 'buscarusername',
									data : "name=" + name,
									success : function(response) {
										$('#tabelaResultado > tbody > tr')
												.remove();
										for (var i = 0; i < response.length; i++) {
											$('#tabelaResultado >tbody')
													.append(
															'<tr id=' + response[i].id + '><td>'
																	+ response[i].id
																	+ '</td><td>'
																	+ response[i].name
																	+ '</td><td>'
																	+ response[i].idade
																	+ '</td><td><button type="button" onclick="editarUsuario('
																	+ response[i].id
																	+ ')" class="btn btn-info" >Editar</button></td><td><button type="button" onclick="deleteUser('
																	+ response[i].id
																	+ ')" class="btn btn-danger">Deletar</button></td></tr>')
										}
									}
								}).fail(function(xhr, status, errorThrown) {
							alert("Erro: " + xhr.responseText)
						})
			}
		}

		function editarUsuario(id) {
			$.ajax({
				method : "GET",
				url : "buscaruserid",
				data : "iduser=" + id,
				success : function(response) {
					$("#id").val(response.id);
					$("#name").val(response.name);
					$("#idade").val(response.idade);
					$("#pesquisaModal").modal('hide')
				}
			}).fail(function(xhr, status, errorThrown) {
				alert("Erro: " + xhr.responseText)
			})
		}

		function deleteUserFromScreen() {
			var id = $('#id').val();
			if (id != null && id.trim() != '') {
				deleteUser(id)
				document.getElementById('formUser').reset()
			}

		}

		function deleteUser(id) {
			if (confirm("Deseja deletar o usuário?")) {
				$.ajax({
					method : "DELETE",
					url : "delete",
					data : "iduser=" + id,
					success : function(response) {
						$('#' + id).remove()
						alert("response")

					}
				}).fail(function(xhr, status, errorThrown) {
					alert("Erro: " + xhr.responseText)
				})
			}

		}

		function salvarUsuario() {
			var id = $("#id").val();
			var name = $("#name").val();
			var idade = $("#idade").val();

			if (name == null || name != null && name.trim() == '') {
				$("#name").focus()
				alert("Insira os dados corretamente.")
				return;
			}

			if (idade == null || idade != null && idade.trim() == '') {
				$("#idade").focus()
				alert("Insira os dados corretamente.")
				return;
			}

			$.ajax({
				method : 'POST',
				url : 'salvar',
				data : JSON.stringify({
					id : id,
					name : name,
					idade : idade
				}),
				contentType : "application/json; charset=utf-8",
				success : function(response) {
					$("#id").val(response.id);
					alert("Salvo com sucesso")
				}
			}).fail(function(xhr, status, errorThrown) {
				alert("Erro: " + xhr.responseText)
			})

		}

		$('#pesquisaModal').on('show.bs.modal', function(event) {
			var button = $(event.relatedTarget) // Button that triggered the modal
			var recipient = button.data('whatever') // Extract info from data-* attributes
			// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
			// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
			var modal = $(this)
			modal.find('.modal-title').text('New message to ' + searchName)
			modal.find('.modal-body input').val(recipient)
		})