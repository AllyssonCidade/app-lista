export function gerarSenhaAleatoria(tamanho:number) {
    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";

    const senhaObrigatoria = [
        letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)],
        letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)],
        numeros[Math.floor(Math.random() * numeros.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)]
    ];

    const todosCaracteres = letrasMaiusculas + letrasMinusculas + numeros + simbolos;

    for (let i = senhaObrigatoria.length; i < tamanho; i++) {
        senhaObrigatoria.push(todosCaracteres[Math.floor(Math.random() * todosCaracteres.length)]);
    }

    return senhaObrigatoria.sort(() => Math.random() - 0.5).join('');
}