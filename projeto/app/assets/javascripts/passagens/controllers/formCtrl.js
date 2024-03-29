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
          vmForm._confirmar('Você tem certeza que deseja excluir essa categoria?',
            opts = {
              trueLabel: 'red',
              onTrue: () => vmForm.formCategoria.destroyCategoria(listObj)
            }
          )
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
          listObj.objeto_categoria_id = listObj.categoria.id
        },
        edit: function(listObj) {
          listObj.categoria = vmForm.indexFactory.settings.lista_categorias.getById(listObj.categoria.id)
          listObj.categoria.active = true
        }
      }


      vmForm.formCadastro = {
        save: function(baseFact) {
          vmForm.formUser.checkUsers(baseFact)
          if(!this.isValido(baseFact)) { return }
          Passagem.save(baseFact.params,
            function(data){
              console.log(data.passagem)
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
        addListaObj: function(baseFact) {
          if(baseFact.params.objetos) {
            baseFact.params.objetos.push({itens: [{}]})
          } else {
            baseFact.params.objetos = [{itens: [{}]} ]
          }
        },
        limparFormulario: function(baseFact) {
          vmForm._confirmar('Tem certeza de que deseja limpar os objetos da passagem?',
            opts = {
              trueLabel: 'yellow',
              onTrue: () => baseFact.params.objetos = []
            }
          )
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
        rmvItem: function(listObj, item) {
          listObj.itens.remove(listObj.itens.getById(item.id))
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
          baseFact.params.user_entrou = {nome: user.nome}
          baseFact.params.user_entrou_id = user.id
          this.toggleUserEntra()
        },
        checkUsers: function(baseFact) {
          if (baseFact.params.user_entrou) {
            if (!baseFact.params.user_entrou.nome) {
              baseFact.params.user_entrou_id = null
            }
          } else if (!baseFact.params.user_saiu.nome) {
              baseFact.params.user_saiu_id = null
          }
        }
      }

      vmForm._confirmar = function(titulo, opts={}) {
        scAlert.open({
          title: titulo,
          messages: opts.message,
          buttons: [
            { label: 'Não', color: 'gray' },
            { label: 'Sim', color: (opts.trueLabel || 'green'), action: () => opts.onTrue() }
          ]
        })
      }

      return vmForm

    }
  ])
}).call(this);
