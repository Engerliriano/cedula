async function buscar() {
  let cedula = document.getElementById("cedula").value;
  if (cedula.length != 11) {
    alert("La cedula debe tener 11 caracteres");
    return false;
  }

  let ulr = "https://api.adamix.net/apec/cedula/" + cedula;

  let persona = await fetch(ulr)
    .then((res) => res.json())
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      alert("No nos pudimos conectar");
      return false;
    });

  console.log(persona);

  if (persona.ok == false) {
    alert("La cedula no fue encontrada");
    return false;
  }
  //Para la edad
  let nacimiento = new Date(persona.FechaNacimiento);
  let ahora = new Date();
  let años = ahora.getFullYear() - nacimiento.getFullYear();

  //Para el estado civil
  if (persona.IdEstadoCivil == "S") {
    estado = "SOLTERO";
  } else {
    estado = "CASADO";
  }

  //Para el signo Zodiacal

  let dia = nacimiento.getUTCDate();
  let mes = nacimiento.getUTCMonth();
  let zodiacal = "";

  if ((dia >= 21 && mes == 2) || (dia <= 19 && mes == 3)) {
    zodiacal = "ARIES";
  } else if ((dia >= 20 && mes == 3) || (dia <= 20 && mes == 4)) {
    zodiacal = "TAURO";
  } else if ((dia >= 21 && mes == 4) || (dia <= 20 && mes == 5)) {
    zodiacal = "GEMINIS";
  } else if ((dia >= 21 && mes == 5) || (dia <= 22 && mes == 6)) {
    zodiacal = "CANCER";
  } else if ((dia >= 23 && mes == 6) || (dia <= 22 && mes == 7)) {
    zodiacal = "LEO";
  } else if ((dia >= 23 && mes == 7) || (dia <= 22 && mes == 8)) {
    zodiacal = "VIRGO";
  } else if ((dia >= 23 && mes == 8) || (dia <= 22 && mes == 9)) {
    zodiacal = "LIBRA";
  } else if ((dia >= 23 && mes == 9) || (dia <= 21 && mes == 10)) {
    zodiacal = "ESCORPIO";
  } else if ((dia >= 22 && mes == 10) || (dia <= 21 && mes == 11)) {
    zodiacal = "SAGITARIO";
  } else if ((dia >= 22 && mes == 11) || (dia <= 19 && mes == 0)) {
    zodiacal = "CAPRICORNIO";
  } else if ((dia >= 22 && mes == 0) || (dia <= 18 && mes == 1)) {
    zodiacal = "ACUARIO";
  } else if ((dia >= 19 && mes == 1) || (dia <= 20 && mes == 2)) {
    zodiacal = "PISCIS";
  }

  document.getElementById("foto").src = persona.foto;
  document.getElementById("nombres").innerHTML = persona.Nombres;
  document.getElementById("apellidos").innerHTML =
    persona.Apellido1 + " " + persona.Apellido2;
  document.getElementById("fechaNacimiento").innerHTML = new Date(
    persona.FechaNacimiento).toLocaleDateString();
  document.getElementById("edad").innerHTML = años;
  document.getElementById("signo").innerHTML = zodiacal;
  document.getElementById("estadoCivil").innerHTML = estado;
  document.getElementById("lugar").innerHTML = persona.LugarNacimiento;
}
