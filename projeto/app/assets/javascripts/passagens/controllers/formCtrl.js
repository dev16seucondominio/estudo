(function() {
  angular.module('myApp').lazy
  .controller("PassagensFormCtrl", [
    "indexFactory", "scAlert", "scTopMessages", "Passagem", "Categoria",
      function(indexFactory, scAlert, scTopMessages, Passagem, Categoria) {
      vmForm = this

      vmForm.indexFactory = indexFactory

      vmForm.init = function(baseFact){
        vmForm.categoria = {active: false}
        vmForm.menu_quem_sai = {isOn: false}
        vmForm.menu_quem_entra = {isOn: false}
        baseFact.params = angular.copy(baseFact.passagem || {})
        delete baseFact.params.formFactory
        baseFact.lista_categoria = vmForm.indexFactory.settings.lista_categorias
      }

      vmForm.formCategoria = {
        saveCategoria: function(categoria) {
          Categoria.save(categoria,
            function(data) {
              vmForm.categoria.active = false

              if(!vmForm.indexFactory.settings.lista_categorias.getById(categoria.id)) {
                vmForm.indexFactory.settings.lista_categorias.push(categoria)
              }
            }, function(response) {
              console.log("deu erro", categoria)
            }
          )
        },
        alertExcluirRegistro: function(categoria) {
          scAlert.open({
            title: 'Você tem certeza que deseja excluir essa categoria?',
            buttons: [
              {
                label: 'Não',
                color: 'gray'
              }, {
                label: 'Sim',
                color: 'red',
                action: function() {
                  vmForm.formCadastro.destroyCategoria(categoria) // Posso escrever a função diretamente aqui?
                }
              }
            ]
          })
        },
        destroyCategoria: function(categoria) {
          Categoria.destroy(categoria,
            function(data) {
              scTopMessages.openSuccess("Categoria excluída com sucesso.", {timeOut: 3000})
              vmForm.indexFactory.settings.lista_categorias.splice(
                vmForm.indexFactory.settings.lista_categorias.indexOf(categoria), 1)
            }, function(response) {
              scTopMessages.openDanger("Não foi possível excluir a categoria.", {timeOut: 3000})
            }
          )
        },
        novaCategoria: function() {
          vmForm.categoria.active = true
          vmForm.params.categoria = {}
        },
        set: function(listObj) {
          console.log(listObj)
          listObj.administrativo_passagem_servico_objeto_categoria_id = listObj.categoria.id
        }
      }


      vmForm.formCadastro = {
        save: function(baseFact) {
          baseFact.params.status = "Pendente"
          Passagem.save(baseFact.params,
            function(data){
              vmForm.formCadastro.isNovo(data)

              vmForm.indexFactory.itemCtrl.handleList(data.passagem)

              scTopMessages.openSuccess(data.msg, {timeOut: 3000})

              baseFact.close()
            }, function(response){
              console.log(response)
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
        },
        isNovo: function(data) {
          if (!data.novo) { return }
          data.passagem.novo = true
          vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
        },
        addListaObj: function(baseFact) {
          if(baseFact.params.objetos) {
            baseFact.params.objetos.push({itens: [{}]})
          } else {
            baseFact.params.objetos = [{itens: [{}]} ]
          }
        },
        limparFormulario: function(baseFact) {
          scAlert.open({
            title: 'Tem certeza de que deseja limpar os objetos da passagem?',
            buttons: [
              {
                label: 'Cancelar',
                color: 'gray'
              }, {
                label: 'Limpar',
                color: 'yellow',
                action: function() {
                  baseFact.params.objetos = []
                }
              }
            ]
          })
        },
        destroyListaObj: function(listObj) {
          listObj._destroy = true
        },
        restauraObj: function(listObj) {
          listObj._destroy = false
        },
        addItem: function(listObj) {
          listObj.itens.push({})
        }
      }

      vmForm.formUser = {
        setUserSai: function(baseFact, user) {
          baseFact.params.user_saiu = {nome: user.nome}
          baseFact.params.user_saiu_id = user.id
        },
        toggleUserSai: function() {
          vmForm.menu_quem_sai.isOn = !vmForm.menu_quem_sai.isOn
        },
        toggleUserEntra: function() {
          vmForm.menu_quem_entra.isOn = !vmForm.menu_quem_entra.isOn
        },
        setUserEntra: function(baseFact, user) {
          console.log(user)
          baseFact.params.user_entrou = {nome: user.nome}
          baseFact.params.user_entrou_id = user.id
        }
      }

      return vmForm

    }
  ])
}).call(this);
