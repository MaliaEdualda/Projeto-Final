require('./database/database');

const EquipamentoDidatico = require('./database/models/EquipamentoDidatico');
const usuarioController = require('./controllers/UsuarioController');
const ReservaEquipamento = require('./database/models/ReservaEquipamento');

const equipments = [
    { "nome_equipamento": "Fume Hood", "marca_equipamento": "TechWave", "tipo_equipamento": "PCR Machine", "modelo_equipamento": "Explorer Sport", "data_aquisicao": "2011-02-10" },
    { "nome_equipamento": "Electron Microscope", "marca_equipamento": "CyberTech", "tipo_equipamento": "Gene Sequencer", "modelo_equipamento": "RDX", "data_aquisicao": "2020-03-20" },
    { "nome_equipamento": "Atomic Force Microscope", "marca_equipamento": "SciConnect", "tipo_equipamento": "Bunsen Burner", "modelo_equipamento": "Tracker", "data_aquisicao": "2004-11-18" },
    { "nome_equipamento": "Gene Sequencer", "marca_equipamento": "InnoTech", "tipo_equipamento": "Thermocycler", "modelo_equipamento": "Passat", "data_aquisicao": "2001-01-30" },
    { "nome_equipamento": "Bunsen Burner", "marca_equipamento": "InnoTech", "tipo_equipamento": "Centrifuge", "modelo_equipamento": "Fiero", "data_aquisicao": "2003-05-06" },
    { "nome_equipamento": "Bunsen Burner", "marca_equipamento": "TechWave", "tipo_equipamento": "Flow Cytometer", "modelo_equipamento": "928", "data_aquisicao": "2013-07-08" },
    { "nome_equipamento": "Mass Spectrometer", "marca_equipamento": "SciConnect", "tipo_equipamento": "Chromatography System", "modelo_equipamento": "Express 2500", "data_aquisicao": "2010-09-17" },
    { "nome_equipamento": "PCR Machine", "marca_equipamento": "SciConnect", "tipo_equipamento": "Nuclear Magnetic Resonance (NMR) Spectrometer", "modelo_equipamento": "Cutlass", "data_aquisicao": "2022-03-26" },
    { "nome_equipamento": "Chromatography System", "marca_equipamento": "SciGenius", "tipo_equipamento": "Fume Hood", "modelo_equipamento": "Voyager", "data_aquisicao": "2002-07-17" },
    { "nome_equipamento": "Chromatography System", "marca_equipamento": "SciTech", "tipo_equipamento": "Pipette", "modelo_equipamento": "Escalade EXT", "data_aquisicao": "2023-03-22" },
    { "nome_equipamento": "Gene Sequencer", "marca_equipamento": "SciTech", "tipo_equipamento": "Autoclave", "modelo_equipamento": "Voyager", "data_aquisicao": "2018-08-23" },
    { "nome_equipamento": "Mass Spectrometer", "marca_equipamento": "InnoSci", "tipo_equipamento": "Autoclave", "modelo_equipamento": "1500 Club Coupe", "data_aquisicao": "2005-06-04" },
    { "nome_equipamento": "Gene Sequencer", "marca_equipamento": "SciTech", "tipo_equipamento": "X-ray Diffraction", "modelo_equipamento": "Interceptor", "data_aquisicao": "2002-02-16" },
    { "nome_equipamento": "X-ray Diffraction", "marca_equipamento": "CyberSci", "tipo_equipamento": "Centrifuge", "modelo_equipamento": "Ascender", "data_aquisicao": "2016-02-15" },
    { "nome_equipamento": "Gene Sequencer", "marca_equipamento": "SciConnect", "tipo_equipamento": "Mass Spectrometer", "modelo_equipamento": "S10", "data_aquisicao": "2012-07-14" },
    { "nome_equipamento": "Incubator", "marca_equipamento": "Techtron", "tipo_equipamento": "Pipette", "modelo_equipamento": "Econoline E250", "data_aquisicao": "2018-02-16" },
    { "nome_equipamento": "Spectrophotometer", "marca_equipamento": "SciGenius", "tipo_equipamento": "Telescope", "modelo_equipamento": "Tacoma", "data_aquisicao": "2020-01-25" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "SciConnect", "tipo_equipamento": "Atomic Force Microscope", "modelo_equipamento": "C-Class", "data_aquisicao": "2016-09-26" },
    { "nome_equipamento": "Microscope", "marca_equipamento": "SciConnect", "tipo_equipamento": "Bunsen Burner", "modelo_equipamento": "Hombre Space", "data_aquisicao": "2010-08-19" },
    { "nome_equipamento": "PCR Machine", "marca_equipamento": "CyberSci", "tipo_equipamento": "Gel Electrophoresis", "modelo_equipamento": "RX", "data_aquisicao": "2010-04-24" },
    { "nome_equipamento": "Telescope", "marca_equipamento": "SciTech", "tipo_equipamento": "Nuclear Magnetic Resonance (NMR) Spectrometer", "modelo_equipamento": "V8 Vantage S", "data_aquisicao": "2018-05-02" },
    { "nome_equipamento": "Telescope", "marca_equipamento": "InnoSci", "tipo_equipamento": "PCR Machine", "modelo_equipamento": "R32", "data_aquisicao": "2013-03-24" },
    { "nome_equipamento": "Spectrophotometer", "marca_equipamento": "Techtron", "tipo_equipamento": "PCR Machine", "modelo_equipamento": "DBS", "data_aquisicao": "2023-08-11" },
    { "nome_equipamento": "Pipette", "marca_equipamento": "SciConnect", "tipo_equipamento": "Flow Cytometer", "modelo_equipamento": "Lucerne", "data_aquisicao": "2017-07-13" },
    { "nome_equipamento": "Pipette", "marca_equipamento": "SciGenius", "tipo_equipamento": "Fume Hood", "modelo_equipamento": "Rendezvous", "data_aquisicao": "2014-06-21" },
    { "nome_equipamento": "Atomic Force Microscope", "marca_equipamento": "TechGenius", "tipo_equipamento": "Nuclear Magnetic Resonance (NMR) Spectrometer", "modelo_equipamento": "Sunfire", "data_aquisicao": "2016-05-28" },
    { "nome_equipamento": "Pipette", "marca_equipamento": "CyberSci", "tipo_equipamento": "Electron Microscope", "modelo_equipamento": "Grand Prix", "data_aquisicao": "2021-11-05" },
    { "nome_equipamento": "Autoclave", "marca_equipamento": "CyberTech", "tipo_equipamento": "Bunsen Burner", "modelo_equipamento": "Odyssey", "data_aquisicao": "2021-09-26" },
    { "nome_equipamento": "Nuclear Magnetic Resonance (NMR) Spectrometer", "marca_equipamento": "CyberSci", "tipo_equipamento": "Incubator", "modelo_equipamento": "Envoy", "data_aquisicao": "2008-09-19" },
    { "nome_equipamento": "PCR Machine", "marca_equipamento": "SciGenius", "tipo_equipamento": "Thermocycler", "modelo_equipamento": "Mountaineer", "data_aquisicao": "2006-03-27" },
    { "nome_equipamento": "Centrifuge", "marca_equipamento": "SciGenius", "tipo_equipamento": "Mass Spectrometer", "modelo_equipamento": "X3", "data_aquisicao": "2004-01-22" },
    { "nome_equipamento": "Nuclear Magnetic Resonance (NMR) Spectrometer", "marca_equipamento": "SciGenius", "tipo_equipamento": "Spectrophotometer", "modelo_equipamento": "Wrangler", "data_aquisicao": "2002-05-07" },
    { "nome_equipamento": "X-ray Diffraction", "marca_equipamento": "Techtron", "tipo_equipamento": "Gene Sequencer", "modelo_equipamento": "E-Class", "data_aquisicao": "2010-05-30" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "CyberSci", "tipo_equipamento": "Thermocycler", "modelo_equipamento": "Cougar", "data_aquisicao": "2013-09-02" },
    { "nome_equipamento": "Pipette", "marca_equipamento": "SciGenius", "tipo_equipamento": "Atomic Force Microscope", "modelo_equipamento": "M Roadster", "data_aquisicao": "2002-03-03" },
    { "nome_equipamento": "Autoclave", "marca_equipamento": "CyberSci", "tipo_equipamento": "Incubator", "modelo_equipamento": "Cougar", "data_aquisicao": "2004-06-04" },
    { "nome_equipamento": "Telescope", "marca_equipamento": "SciConnect", "tipo_equipamento": "Thermocycler", "modelo_equipamento": "Lucerne", "data_aquisicao": "2004-11-02" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "TechGenius", "tipo_equipamento": "PCR Machine", "modelo_equipamento": "LS", "data_aquisicao": "2008-03-08" },
    { "nome_equipamento": "Telescope", "marca_equipamento": "Techtron", "tipo_equipamento": "Autoclave", "modelo_equipamento": "Lancer Evolution", "data_aquisicao": "2012-01-17" },
    { "nome_equipamento": "Bunsen Burner", "marca_equipamento": "SciGenius", "tipo_equipamento": "Microscope", "modelo_equipamento": "Dakota", "data_aquisicao": "2022-08-22" },
    { "nome_equipamento": "Electron Microscope", "marca_equipamento": "SciConnect", "tipo_equipamento": "Flow Cytometer", "modelo_equipamento": "Suburban 1500", "data_aquisicao": "2022-08-10" },
    { "nome_equipamento": "Fume Hood", "marca_equipamento": "TechGenius", "tipo_equipamento": "Mass Spectrometer", "modelo_equipamento": "Reno", "data_aquisicao": "2006-10-11" },
    { "nome_equipamento": "Fume Hood", "marca_equipamento": "Techtron", "tipo_equipamento": "Microscope", "modelo_equipamento": "Riviera", "data_aquisicao": "2013-02-15" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "SciGenius", "tipo_equipamento": "Gene Sequencer", "modelo_equipamento": "tC", "data_aquisicao": "2019-02-15" },
    { "nome_equipamento": "Centrifuge", "marca_equipamento": "SciGenius", "tipo_equipamento": "Autoclave", "modelo_equipamento": "Econoline E350", "data_aquisicao": "2001-01-29" },
    { "nome_equipamento": "Incubator", "marca_equipamento": "CyberSci", "tipo_equipamento": "Gene Sequencer", "modelo_equipamento": "A6", "data_aquisicao": "2005-01-23" },
    { "nome_equipamento": "Electron Microscope", "marca_equipamento": "SciConnect", "tipo_equipamento": "Microscope", "modelo_equipamento": "A4", "data_aquisicao": "2011-07-30" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "Techtron", "tipo_equipamento": "Spectrophotometer", "modelo_equipamento": "Corvette", "data_aquisicao": "2013-05-30" },
    { "nome_equipamento": "Flow Cytometer", "marca_equipamento": "CyberSci", "tipo_equipamento": "Fume Hood", "modelo_equipamento": "Legacy", "data_aquisicao": "2005-07-07" },
    { "nome_equipamento": "Chromatography System", "marca_equipamento": "SciGenius", "tipo_equipamento": "Electron Microscope", "modelo_equipamento": "Space", "data_aquisicao": "2021-06-04" }];


const users = [
    { "nome_completo": "Maria Eduarda Ramos de Queiroz", "email": "mariaedduardda@gmail.com", "data_nascimento": "2004-08-07", "cep": "78056340", "telefone": "(65) 99956-9572", "senha": "malia1234" },
    { "nome_completo": "Felipe Neves Brito", "email": "felipe.snow@gmail.com", "data_nascimento": "2003-10-15", "cep": "81045035", "telefone": "(65) 99816-3262", "senha": "felipesnow" },
    { "nome_completo": "Ana Beatriz Schuindt do Amaral", "email": "ana.schuindt@gmail.com", "data_nascimento": "2005-07-20", "cep": "78070410", "telefone": "", "senha": "beatriz123" }];

const reservations = [
    { "equipamentoDidaticoId": "1", "usuarioId": "1", "data_reserva": "2023-12-25", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2024-01-01", "data_devolucao": null },
    { "equipamentoDidaticoId": "2", "usuarioId": "1", "data_reserva": "2023-10-10", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-10-10", "data_devolucao": null },
    { "equipamentoDidaticoId": "3", "usuarioId": "1", "data_reserva": "2023-11-11", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-11-11", "data_devolucao": null },
    { "equipamentoDidaticoId": "4", "usuarioId": "2", "data_reserva": "2023-10-09", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-10-09", "data_devolucao": null },
    { "equipamentoDidaticoId": "5", "usuarioId": "2", "data_reserva": "2023-11-10", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-11-20", "data_devolucao": null },
    { "equipamentoDidaticoId": "6", "usuarioId": "3", "data_reserva": "2023-10-11", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-10-15", "data_devolucao": null },
    { "equipamentoDidaticoId": "7", "usuarioId": "3", "data_reserva": "2023-11-09", "razao_reserva": "Uso em sala de aula", "previsao_devolucao": "2023-11-12", "data_devolucao": null }];

(async () => {
    for (let equipment of equipments) {
        const attributes = equipment

        await EquipamentoDidatico.create(attributes);
    }

    for (let user of users) {
        const { senha, ...attributes } = user;

        await usuarioController.signUp(attributes, senha);
    }

    for (let reservation of reservations) {
        const attributes = reservation;

        await ReservaEquipamento.create(attributes);
    }

    console.log('Processo de população concluído!');

})();