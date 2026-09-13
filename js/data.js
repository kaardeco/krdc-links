/**
 * ============================================================================
 *  DADOS DO SITE — edite apenas este arquivo para atualizar o conteúdo.
 *  Tudo que está entre [COLCHETES] é um placeholder e deve ser substituído.
 * ============================================================================
 */

const SITE_DATA = {
  // ---------------------------------------------------------------------
  // PERFIL
  // ---------------------------------------------------------------------
  profile: {
    avatar: "src/img/avatar.png", // foto de perfil (exibida redonda)
    avatarAlt: "KRDC",
    logo: "src/img/krdc_white.png", // logotipo (versão para fundo escuro)
    name: "KRDC",
    handle: "@krdcmusic",
    bio: "DJ / Producer",
    tagline: "Desync / Groove E-Music / In Trip Club",
  },

  // ---------------------------------------------------------------------
  // REDES SOCIAIS
  // Adicione, remova ou reordene itens livremente. "icon" precisa
  // corresponder a uma chave existente em ICONS (js/script.js).
  // ---------------------------------------------------------------------
  socials: [
    { name: "Instagram", url: "https://instagram.com/krdcmusic", icon: "instagram" },
    { name: "SoundCloud", url: "https://soundcloud.com/krdcmusic", icon: "soundcloud" },
    { name: "E-mail", url: "mailto:contato@krdcmusic.com", icon: "mail" },
  ],

  // ---------------------------------------------------------------------
  // SETS EM DESTAQUE
  // "thumbnail" é opcional — se vazio, um bloco dither placeholder é usado.
  // ---------------------------------------------------------------------
  sets: {
    soundcloud: {
      label: "SET // SOUNDCLOUD",
      title: "Sync Studio Contest",
      url: "https://soundcloud.com/krdcmusic/krdc-sync-studio-contest",
      thumbnail: "https://i1.sndcdn.com/artworks-9S75M9dL9xYrgIpf-gsMk5A-t500x500.png",
    },
    youtube: {
      label: "SET // SOUNDCLOUD",
      title: "Warm Up @ Genesis / SOS Sul - Speedtest",
      url: "https://soundcloud.com/krdcmusic/warmup-genesis-o-resgate",
      thumbnail: "https://i1.sndcdn.com/artworks-Gbzj60fHgYm2Gz4y-1tr1pg-t500x500.jpg",
    },
  },

  // ---------------------------------------------------------------------
  // AGENDA
  // Datas no formato "AAAA-MM-DD". ticketUrl pode ser null.
  // ---------------------------------------------------------------------
  agenda: [
    {
      date: "2026-10-04",
      city: "[CIDADE]",
      venue: "[NOME DO EVENTO / LOCAL]",
      ticketUrl: "[LINK DE INGRESSO]",
    },
    {
      date: "2026-11-15",
      city: "[CIDADE]",
      venue: "[NOME DO EVENTO / LOCAL]",
      ticketUrl: null,
    },
    {
      date: "2026-12-20",
      city: "[CIDADE]",
      venue: "[NOME DO EVENTO / LOCAL]",
      ticketUrl: "[LINK DE INGRESSO]",
    },
  ],

  // ---------------------------------------------------------------------
  // RODAPÉ
  // ---------------------------------------------------------------------
  footer: {
    email: "contato@krdcmusic.com",
    copyrightName: "KRDC",
  },
};
