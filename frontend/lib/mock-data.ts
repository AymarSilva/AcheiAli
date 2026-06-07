import type {
  Ambulante,
  Catalogo,
  Cliente,
  ItemCatalogo,
  PontoVenda,
} from "./types"

export const categorias = [
  "Comida",
  "Bebidas",
  "Doces",
  "Artesanato",
  "Roupas",
  "Acessórios",
  "Plantas",
] as const

export const ambulantes: Ambulante[] = [
  {
    id: "amb-1",
    nome: "Tapioca da Dona Rosa",
    descricao:
      "Tapiocas artesanais com recheios doces e salgados, feitas na hora com goma fresquinha.",
    categoria: "Comida",
    email: "rosa@acheali.com",
    telefone: "(85) 99876-1122",
    cidade: "Fortaleza",
    plano: "premium",
    avaliacao: 4.9,
    totalAvaliacoes: 312,
    imagem: "/tapioca-food-stall.png",
    destaque: true,
  },
  {
    id: "amb-2",
    nome: "Açaí do Léo",
    descricao:
      "Açaí cremoso na tigela com complementos variados. Energia pura pro seu dia.",
    categoria: "Bebidas",
    email: "leo@acheali.com",
    telefone: "(85) 98123-4455",
    cidade: "Fortaleza",
    plano: "premium",
    avaliacao: 4.7,
    totalAvaliacoes: 198,
    imagem: "/acai-bowl-cart.png",
    destaque: true,
  },
  {
    id: "amb-3",
    nome: "Brigadeiros da Mel",
    descricao:
      "Brigadeiros gourmet em dezenas de sabores. Encomendas para festas e o dia a dia.",
    categoria: "Doces",
    email: "mel@acheali.com",
    telefone: "(85) 99711-2200",
    cidade: "Caucaia",
    plano: "premium",
    avaliacao: 5.0,
    totalAvaliacoes: 421,
    imagem: "/gourmet-brigadeiro-sweets.png",
    destaque: true,
  },
  {
    id: "amb-4",
    nome: "Crochê da Vovó",
    descricao:
      "Peças de crochê feitas à mão: tapetes, sousplats, amigurumis e enxoval.",
    categoria: "Artesanato",
    email: "vovo@acheali.com",
    cidade: "Maracanaú",
    plano: "free",
    avaliacao: 4.8,
    totalAvaliacoes: 86,
    imagem: "/handmade-crochet-craft.png",
  },
  {
    id: "amb-5",
    nome: "Pastel do Seu Zé",
    descricao:
      "Pastéis crocantes fritos na hora. O melhor pastel de feira da região.",
    categoria: "Comida",
    email: "ze@acheali.com",
    telefone: "(85) 98800-3344",
    cidade: "Fortaleza",
    plano: "premium",
    avaliacao: 4.6,
    totalAvaliacoes: 254,
    imagem: "/fried-pastel-street-food.png",
  },
  {
    id: "amb-6",
    nome: "Plantas da Ana",
    descricao:
      "Suculentas, mudas e vasinhos decorados para alegrar a sua casa.",
    categoria: "Plantas",
    email: "ana@acheali.com",
    cidade: "Eusébio",
    plano: "free",
    avaliacao: 4.9,
    totalAvaliacoes: 64,
    imagem: "/succulents-plants-stand.png",
  },
]

export const catalogos: Catalogo[] = [
  {
    id: "cat-1",
    ambulanteId: "amb-1",
    titulo: "Cardápio de Tapiocas",
    descricao: "Doces e salgadas, sempre fresquinhas.",
  },
  {
    id: "cat-2",
    ambulanteId: "amb-3",
    titulo: "Brigadeiros Gourmet",
    descricao: "Caixas e unidades para todos os gostos.",
  },
]

export const itens: ItemCatalogo[] = [
  {
    id: "item-1",
    catalogoId: "cat-1",
    nome: "Tapioca de Frango com Catupiry",
    descricao: "Recheio cremoso de frango desfiado com requeijão.",
    preco: 14.0,
    imagem: "/chicken-tapioca.png",
    disponivel: true,
  },
  {
    id: "item-2",
    catalogoId: "cat-1",
    nome: "Tapioca de Coco com Leite Condensado",
    descricao: "A clássica doce que todo mundo ama.",
    preco: 12.0,
    imagem: "/coconut-sweet-tapioca.png",
    disponivel: true,
  },
  {
    id: "item-3",
    catalogoId: "cat-2",
    nome: "Caixa com 12 Brigadeiros",
    descricao: "Sortidos: tradicional, beijinho, churros e pistache.",
    preco: 36.0,
    imagem: "/brigadeiro-box.png",
    disponivel: true,
  },
  {
    id: "item-4",
    catalogoId: "cat-2",
    nome: "Brigadeiro de Pistache (un.)",
    descricao: "Edição especial com pistache importado.",
    preco: 4.5,
    imagem: "/pistachio-brigadeiro.png",
    disponivel: false,
  },
]

export const pontosVenda: PontoVenda[] = [
  {
    id: "pv-1",
    ambulanteId: "amb-1",
    nome: "Feirinha da Beira-Mar",
    endereco: "Av. Beira-Mar, s/n - Meireles",
    cidade: "Fortaleza",
    diasSemana: ["Sáb", "Dom"],
    horario: "16h às 22h",
  },
  {
    id: "pv-2",
    ambulanteId: "amb-1",
    nome: "Praça do Ferreira",
    endereco: "Centro",
    cidade: "Fortaleza",
    diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    horario: "08h às 14h",
  },
  {
    id: "pv-3",
    ambulanteId: "amb-2",
    nome: "Calçadão da Praia de Iracema",
    endereco: "Praia de Iracema",
    cidade: "Fortaleza",
    diasSemana: ["Ter", "Qui", "Sáb", "Dom"],
    horario: "15h às 21h",
  },
]

export const clientes: Cliente[] = [
  {
    id: "cli-1",
    nome: "João Pereira",
    email: "joao@email.com",
    telefone: "(85) 99999-0001",
    cidade: "Fortaleza",
    criadoEm: "2025-01-12",
  },
  {
    id: "cli-2",
    nome: "Maria Souza",
    email: "maria@email.com",
    cidade: "Caucaia",
    criadoEm: "2025-02-03",
  },
]
