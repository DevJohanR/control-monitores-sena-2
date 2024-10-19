"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Seeding...');
                    // Limpiar las tablas antes de insertar datos nuevos (opcional)
                    return [4 /*yield*/, prisma.horario.deleteMany()];
                case 1:
                    // Limpiar las tablas antes de insertar datos nuevos (opcional)
                    _a.sent();
                    return [4 /*yield*/, prisma.instructor.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.ficha.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.ambiente.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.diasSemana.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.jornadas.deleteMany()];
                case 6:
                    _a.sent();
                    // Crear días de la semana
                    return [4 /*yield*/, prisma.diasSemana.createMany({
                            data: [
                                { dia: 'Lunes' },
                                { dia: 'Martes' },
                                { dia: 'Miércoles' },
                                { dia: 'Jueves' },
                                { dia: 'Viernes' },
                                { dia: 'Sábado' },
                            ],
                        })];
                case 7:
                    // Crear días de la semana
                    _a.sent();
                    // Crear jornadas
                    return [4 /*yield*/, prisma.jornadas.createMany({
                            data: [
                                { jornada: 'Mañana' },
                                { jornada: 'Tarde' },
                                { jornada: 'Noche' },
                            ],
                        })];
                case 8:
                    // Crear jornadas
                    _a.sent();
                    // Crear instructores
                    return [4 /*yield*/, prisma.instructor.createMany({
                            data: [
                                {
                                    nombre: 'Alfredo Bermejo',
                                    asignatura: 'Inteligencia Empresarial',
                                    ficha: '2929143',
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1,2,3,4',
                                    ambiente: '1',
                                    bloque: '5',
                                    sede: 'Divino Niño',
                                },
                                {
                                    nombre: 'María Pérez',
                                    asignatura: 'Derecho Penal',
                                    ficha: '7777143',
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1',
                                    ambiente: '10',
                                    bloque: '6',
                                    sede: 'Divino Niño',
                                },
                            ],
                        })];
                case 9:
                    // Crear instructores
                    _a.sent();
                    // Crear fichas
                    return [4 /*yield*/, prisma.ficha.createMany({
                            data: [
                                {
                                    idInstructor: 1, // Alfredo Bermejo
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1,2,3,4',
                                    ambiente: '1',
                                    bloque: '5',
                                    sede: 'Divino Niño',
                                },
                                {
                                    idInstructor: 2, // María Pérez
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1',
                                    ambiente: '10',
                                    bloque: '6',
                                    sede: 'Divino Niño',
                                },
                            ],
                        })];
                case 10:
                    // Crear fichas
                    _a.sent();
                    // Crear ambientes
                    return [4 /*yield*/, prisma.ambiente.createMany({
                            data: [
                                {
                                    asignatura: 'Inteligencia Empresarial',
                                    ficha: '2929143',
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1,2,3,4',
                                    idInstructor: 1, // Alfredo Bermejo
                                    bloque: '5',
                                    sede: 'Divino Niño',
                                },
                                {
                                    asignatura: 'Derecho Penal',
                                    ficha: '7777143',
                                    tema: 'Ejercer derechos fundamentales en el marco del trabajo',
                                    ra: '1',
                                    idInstructor: 2, // María Pérez
                                    bloque: '6',
                                    sede: 'Divino Niño',
                                },
                            ],
                        })];
                case 11:
                    // Crear ambientes
                    _a.sent();
                    // Crear horarios
                    return [4 /*yield*/, prisma.horario.createMany({
                            data: [
                                {
                                    idInstructor: 1, // Alfredo Bermejo
                                    idFicha: 1, // Ficha 1
                                    idAmbiente: 1, // Ambiente 1
                                    idDiaSemana: 1, // Lunes
                                    idJornada: 1, // Mañana
                                    horarioInicio: new Date('2024-10-18T08:00:00Z'),
                                    horaFin: new Date('2024-10-18T10:00:00Z'),
                                },
                                {
                                    idInstructor: 1, // Alfredo Bermejo
                                    idFicha: 1, // Ficha 1
                                    idAmbiente: 1, // Ambiente 1
                                    idDiaSemana: 2, // Martes
                                    idJornada: 1, // Mañana
                                    horarioInicio: new Date('2024-10-18T08:00:00Z'),
                                    horaFin: new Date('2024-10-18T10:00:00Z'),
                                },
                                {
                                    idInstructor: 2, // María Pérez
                                    idFicha: 2, // Ficha 2
                                    idAmbiente: 2, // Ambiente 2
                                    idDiaSemana: 5, // Viernes
                                    idJornada: 2, // Tarde
                                    horarioInicio: new Date('2024-10-18T14:00:00Z'),
                                    horaFin: new Date('2024-10-18T16:00:00Z'),
                                },
                            ],
                        })];
                case 12:
                    // Crear horarios
                    _a.sent();
                    console.log('Seeding completed!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
