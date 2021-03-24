angular.module("pagadoresApp").lazy
.controller("PessoasCtrl", [
  "formFactory", "scAlert", "scTopMessages", "Templates", "Pagador", function(formFactory, scAlert, scTopMessages, Templates, Pagador) {
    vmIdx = this

    // assim como Template, a resource Pagadores vai trabalhar como uma factory, retornando um obj de metodos...
    // Pra template vc acessava como Template.method_key, ex: Template.form, Template.form_enderecos...
    // pra resource, eh a msm coisa. 
    // primeiro tu o nome da resource inclui ali
    // pera, o nome é List ou index? 
    // nenhum dos dois. qual eh o NOME da factory de templates?

    // com a inclusao, vc consegue chamar os metodos....
    // Pagador.list, Pagador.submit, Pagador.destroy....

    // pra estruturacao do codigo, a gente costuma fazer um metodo que carrega tudo que tem que ser carregado assim q abrimos a tela
    // esse metodo gealmente eh o init

    // vmIdx.templates.pagadores.show .... bate no arquivo html do show
    vmIdx.templates = Templates;

    vmIdx.formFactory = undefined;

    vmIdx.init = function(pessoa){
      // aqui dentro vc faz coisas e carrega coisas, sóóóóóóó q preferencialmente separando as logicas...
      vmIdx.listCtrl.init() // init de listagem, carrega a lista // carrega aqui, depois q executa vai pro proximo
      vmIdx.settings.loadSettings() // metodo que carrega as configuracoes da tela... // exceuta vai p proximo
      vmIdx.meuObj.minhaFuncaoInit() // qualquer coisa q vcc precise fazer // ....
      vmIdx.formFactory = new formFactory() //instanciando a factory..
      vmIdx.formFactory.lista = vmIdx.pessoas.listaPessoas
      vmIdx.filtro.listar = angular.copy(vmIdx.settings.filtro.default)
    }

    vmIdx.listCtrl = {// geralmente o listCtrl eh o obj responsavel pelo gerenciamoento da listagem de registros da tela... como ééééééééééh uma tela de pgadores, logo ele cuida da listagem de pagadoes
      list: [],
      carregando: false,

      init: function(){
        // aqui vc precisa de um params para fazer a listagem especifica... vamos supor q vc queira carregar apenas os pagadores do cliente 2, entao tu passa o id do dlciente + demais parametros (opcoes de filtro, por exemplo - com cpf, sem cpf..)
        // costumamos ter um ctrl pra filtro tbmn, mas nao sera necessario no seu caso agora 
        // calma, o settings load não tem a função de trazer essas coisas? que coisas? filtros, planos de contas, fundos, sim mai q q tem?
        // nunzei, por um momento achei que teria aqui tb, mas acho que me equivogay
        // entao... o init da tela vai carregar tudo, n vai? 
        // a gente costuma definir uns parametros bem default no proprio js + uma dependencia do sistema q pega os dados da sessao de usuario (user id, cliente, roles (permissoes), etc...)
        // aqui vc s usa os dados pra montar o params abaixmo
        // entendi.
        params = { cliente_id: 2 }
        // o @ que vc tinha colocado aqui é o this, né?
        // ss fon trap, costume
        // minto, né nao. o @ chama o metodo do ctrl atual, de acordo com o nivel
        // this fora do obj vc acessa o vmIdx
        // @ vc acessa algo dentro do obj
        // a gente usa @ aqui no coffee, nem sei se aqui vai funfar mas vamo descobrir em breve]
        // spoiler: não vai
        // acho que é o this mesmo, para esse caso 
        // n tem problema dps ajeita isso, vamo pro beck agora hehe boay
        @exec() // monto os params e chamo um exec pra fazer a requisicao
      },
       exec: function(params) { // bruh javascript puro eh coisa de gay, eu e meus manos usamos coffee
        this.carregando = true // pra exibir alguma mensagem ou icone de carregamento... ou usar como precisar
        Pagador.list(params),
        // qse um bloco de switch case.. onData = data, onError = response
        //ia perguntar isso, pq a sintaxe parece com switch case, mas não tem um data falando que tem erro ou
        // um response falando que deu certo? nao, s se for algum programador maluco fazendo isso, pq esse eh o modelo de boa pratica das linguagens, onde tu iria encontrar algo parecido em 90% dos projetos q usam por ai.. eh nativo das linguagens
          (data)=> 
            vmIdx.listCtrl.list = angular.extend(data.list)
            this.carregando = false// extend pra sobreescrever/mesclar a lista, a nao ser vc precise dela vazia antes de jogar os pagadores da requisicao...
            // data eh um obj { list: {} , key: {} , outra_key: {} }
            // achei que data/response era apenas para falar que tá tudo certo ou tá tudo errado
            // imaginei que a list chegaria em params.list
            // pera la amigao, params eh o que vc manda pro servidor... n faz sentido o servidor de rerotnar o proprio params com a lista dentro 
            // quando carregar vc vai querer fazer coisas... // esse data eh nativo. significa que a requisicao resultou em alguma coisa. qualquer coisa... lista, obj, registro unico... se tem data, é pq a requisicao teve sucesso
            // a mais basica dela eh pegar a lista que recebemos do servidor e colocar na lista do nosso ctrl de pessoas...
          // se nao tiver data...
          // (response)=> 
          //   // aqui, supondo q vc recebe uma mensagem de erro, tu ja chama o sctopmessages e faz a putaria // se cair no bloco de response, geralmente eh alguma mensagem de erro (a requisicao foi feita com sucesso mas retornou erro)
          //   errors = []
          //   scTopMessages.openDanger errors if errors.any()
          //   this.carregando = false

            // essa eh bascaimente a estrutura no front... no back eh so montar a listagem ou busca no metodo index, primeiro no controller e depois no service...
       }
    }



    vmIdx.pessoas = {
      listaPessoas: [
      { id: 1, sexo: 'm', deficiente: false, nome: 'Igor Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [{principal: true, id: 1}, {principal: false, id: 2}], contas: [], perfilPagamento: {} },
      { id: 2, sexo: 'm', deficiente: false, nome: 'Lucas Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [{principal: true, id: 1}, {principal: false, id: 2}], contas: [], perfilPagamento: {} },
      { id: 3, sexo: 'm', deficiente: false, nome: 'Erick Silva',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 4, sexo: 'm', deficiente: false, nome: 'Amanda Pereira',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 5, sexo: 'm', deficiente: false, nome: 'Jessica Ferreira',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 6, sexo: 'm', deficiente: false, nome: 'Pedro Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 7, sexo: 'm', deficiente: false, nome: 'Ítalo Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 8, nome: 'Thamires Laissa',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Fornecedor', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 9, sexo: 'm', deficiente: false, nome: 'Diogo João',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'aaaaaa', enderecos: [], contas: [], perfilPagamento: {} }
      ],
      excluirRegistro: function(pessoa) {
        scAlert.open({
          title: 'Você tem certeza que deseja excluir essa pessoa?',
          messages: 'Todos os dados serão perdidos!',
          buttons: [
            {
              label: 'Não',
              color: 'gray'
            }, {
              label: 'Sim',
              color: 'yellow',
              action: function() {
                scTopMessages.openSuccess("Registro excluído com sucesso!", {timeOut: 3000})
                vmIdx.pessoas.listaPessoas.splice(vmIdx.pessoas.listaPessoas.indexOf(pessoa), 1)
              }
            }
          ]
        })
      }
    }

    vmIdx.settings = {
      filtro: {
        avancado: false,
        default: {},
        listOpcoes: [
          {label: 'Com endereço', active: false, key: 'com_endereco'},
          {label: 'Sem endereço', active: false, key: 'sem_endereco'},
          {label: 'Endereço completo', active: false, key: 'endereco_completo'},
          {label: 'Endereço Incompleto', active: false, key: 'endereco_incompleto'},
          {label: 'Sem CPF/CNPJ', active: false, key: 'sem_documento'},
          {label: 'Com CPF/CNPJ', active: false, key: 'com_documento'},
          {label: 'Sem bloqueio inadimplente', active: false, key: 'sem_bloqueio'},
          {label: 'Com bloqueio inadimplente', active: false, key: 'com_bloqueio'},
          {label: 'Sem emails', active: false, key: 'sem_email'},
          {label: 'Com emails', active: false, key: 'com_email'}
        ]
      },
      loadSettings: function(){
        console.log('aaaaaaaaaaaaaa')
      }
    }

    vmIdx.filtro = {
      listar: {},
      params: {},
      exec: function(tipo){
        this.listar = {}
        if(tipo == 'simples') {
          this.params.q ? this.listar = this.params.q : this.listar = angular.copy(this.params)
          this.preenchido = true
        }
        if(tipo == 'avancado') {
          delete(this.params.q)
          this.listar = angular.copy(this.params)
          vmIdx.settings.filtro.avancado = false
          this.preenchido = true
        }
      },
      limpar: function() {
        this.listar = []
        this.params = {}
        this.preenchido = false
      },
      togglePf: function() {
        this.params.juridica = false
      },
      togglePj: function() {
        this.params.juridica = true
      },
      buscarTipo: function(tipo) {
        this.params.tipo = tipo
      },
      opcoes: {
        set: function(opcao) {
          console.log(opcao)
          opcao.active = !opcao.active
          if(opcao.key == 'com_endereco') this.comEndereco()
        },
        comEndereco: function() {
          vmIdx.filtro.listar = vmIdx.pessoas.listaPessoas.filter(pessoa => (pessoa.enderecos.length))
          // if (pessoa.enderecos.length > 0) {
          //   console.log('Pessoa com endereço: ',pessoa)
          //   return pessoa
          // } //filter:PessoasCtrl.filtro.opcoes.comEndereco
        }
      }
    }

    return vmIdx

  }
])
