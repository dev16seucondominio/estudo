(function() {
  angular.module('myApp').lazy
  .controller("PassagensFormCtrl", [
    "indexFactory", "scAlert", "scTopMessages", "Passagem", "Categoria",
      function(indexFactory, scAlert, scTopMessages, Passagem, Categoria) {
      vmForm = this

      vmForm.indexFactory = indexFactory

      vmForm.init = function(baseFact){
        baseFact.categoria = {active: false}
        vmForm.params = {}
        vmForm.menu_quem_sai = {isOn: false}
        vmForm.menu_quem_entra = {isOn: false}
        baseFact.params = angular.copy(baseFact.passagem || {})
        delete baseFact.params.formFactory
      }

      vmForm.formCategoria = {
        saveCategoria: function(listObj) {
          Categoria.save(listObj.categoria,
            function(data) {
              listObj.categoria.active = false

              if(!vmForm.indexFactory.settings.lista_categorias.getById(listObj.categoria.id)) {
                vmForm.indexFactory.settings.lista_categorias.push(listObj.categoria)
              }
            }, function(response) {
              console.log("deu erro", categoria)
            }
          )
        },
        beforeDestroyCategoria: function(listObj) {
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
                  vmForm.formCategoria.destroyCategoria(listObj)
                }
              }
            ]
          })
        },
        destroyCategoria: function(listObj) {
          Categoria.destroy(listObj.categoria,
            function(data) {
              scTopMessages.openSuccess("Categoria excluída com sucesso.", {timeOut: 3000})
              vmForm.indexFactory.settings.lista_categorias.splice(
                vmForm.indexFactory.settings.lista_categorias.indexOf(listObj.categoria), 1)
            }, function(response) {
              console.log(response)
              scTopMessages.openDanger("Não foi possível excluir a categoria.", {timeOut: 3000})
            }
          )
        },
        novaCategoria: function(listObj) {
          listObj.categoria = {active: true}
        },
        set: function(listObj) {
          listObj.administrativo_passagem_servico_objeto_categoria_id = listObj.categoria.id
        },
        edit: function(listObj) {
          listObj.categoria = vmForm.indexFactory.settings.lista_categorias.getById(listObj.categoria.id)
          listObj.categoria.active = true
        }
      }


      vmForm.formCadastro = {
        save: function(baseFact) {
          console.log(baseFact)
          if(!this.isValido(baseFact)) { return }
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
        isValido: function(baseFact) {
          errors = []
          if(!baseFact.params.user_saiu_id) {
            if(baseFact.params.user_saiu) {
              baseFact.params.user_saiu_id = baseFact.params.user_saiu.id
            } else {
              errors.push("Quem sai não pode ser vazio!")
            }
          }
          this.isRelizada(baseFact)
          if (errors.length){
            scTopMessages.openDanger(errors.join('; '), {timeOut: 3000})
            return false
          } else {
            return true
          }
        },
        isNovo: function(data) {
          if (!data.novo) { return }
          data.passagem.novo = true
          vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
        },
        isRelizada: function(baseFact) {
          if(baseFact.params.user_entrou_id) {
            baseFact.params.status = "Relizada"
          } else {
            baseFact.params.status = "Pendente"
          }
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
        },
        desativarPassagem: function(baseFact) {

        }
      }

      vmForm.formUser = {
        setUserSai: function(baseFact, user) {
          baseFact.params.user_saiu = {nome: user.nome}
          baseFact.params.user_saiu_id = user.id
          this.toggleUserSai()
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
          this.toggleUserEntra()
        }
      }

      return vmForm

    }
  ])
}).call(this);
