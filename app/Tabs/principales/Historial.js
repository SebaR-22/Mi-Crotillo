

// src/pantallas/principales/Historial.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import TemaColores from '../../estilos/TemaColores';

const Historial = ({ navigation }) => {
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('todos'); // 'todos', 'ingresos', 'gastos'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Datos de ejemplo (luego vendrán del Context/API)
  const [transacciones, setTransacciones] = useState([
    {
      id: '1',
      tipo: 'gasto',
      categoria: 'Comida',
      monto: 1500,
      nombre: 'Supermercado',
      fecha: '2025-10-01',
    },
    {
      id: '2',
      tipo: 'ingreso',
      categoria: 'Sueldo',
      monto: 50000,
      nombre: 'Salario mensual',
      fecha: '2025-10-01',
    },
    {
      id: '3',
      tipo: 'gasto',
      categoria: 'Transporte',
      monto: 500,
      nombre: 'Taxi',
      fecha: '2025-09-30',
    },
    {
      id: '4',
      tipo: 'gasto',
      categoria: 'Electricidad',
      monto: 3500,
      nombre: 'Factura de luz',
      fecha: '2025-09-29',
    },
    {
      id: '5',
      tipo: 'gasto',
      categoria: 'Entretenimiento',
      monto: 2000,
      nombre: 'Netflix',
      fecha: '2025-09-28',
    },
  ]);

  const categorias = ['todas', 'Comida', 'Transporte', 'Electricidad', 'Agua', 'Salud', 'Entretenimiento', 'Sueldo'];

  // Filtrar transacciones
  const transaccionesFiltradas = transacciones.filter((item) => {
    const cumpleTipo = filtroSeleccionado === 'todos' || item.tipo === filtroSeleccionado;
    const cumpleCategoria = categoriaSeleccionada === 'todas' || item.categoria === categoriaSeleccionada;
    return cumpleTipo && cumpleCategoria;
  });

  // Calcular totales
  const totalIngresos = transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((sum, t) => sum + t.monto, 0);
  
  const totalGastos = transacciones
    .filter(t => t.tipo === 'gasto')
    .reduce((sum, t) => sum + t.monto, 0);
  
  const balance = totalIngresos - totalGastos;

  const formatearMoneda = (monto) => {
    return `$${monto.toLocaleString('es-AR')}`;
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const aplicarFiltros = () => {
    setModalFiltrosVisible(false);
  };

  const limpiarFiltros = () => {
    setFiltroSeleccionado('todos');
    setCategoriaSeleccionada('todas');
  };

  const renderItemTransaccion = ({ item }) => (
    <TouchableOpacity
      style={estilos.itemTransaccion}
      activeOpacity={0.7}
      onPress={() => {
        // Aquí puedes navegar a detalle o editar
        console.log('Ver detalle:', item);
      }}
    >
      <View style={estilos.itemIzquierda}>
        <View style={[
          estilos.iconoCategoria,
          { backgroundColor: item.tipo === 'ingreso' ? TemaColores.colores.exito : TemaColores.colores.categoriaComida }
        ]}>
          <Text style={estilos.textoIcono}>
            {item.categoria.charAt(0)}
          </Text>
        </View>
        
        <View style={estilos.infoTransaccion}>
          <Text style={estilos.nombreTransaccion}>{item.nombre}</Text>
          <Text style={estilos.categoriaTransaccion}>{item.categoria}</Text>
          <Text style={estilos.fechaTransaccion}>{formatearFecha(item.fecha)}</Text>
        </View>
      </View>

      <View style={estilos.itemDerecha}>
        <Text style={[
          estilos.montoTransaccion,
          { color: item.tipo === 'ingreso' ? TemaColores.colores.exito : TemaColores.colores.rojoPrimario }
        ]}>
          {item.tipo === 'ingreso' ? '+' : '-'} {formatearMoneda(item.monto)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.contenedor}>
      {/* Header */}
      <View style={estilos.header}>
        <Text style={estilos.titulo}>Historial</Text>
        <TouchableOpacity
          style={estilos.botonFiltro}
          onPress={() => setModalFiltrosVisible(true)}
        >
          <Text style={estilos.textoBotonFiltro}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Resumen de balance */}
      <View style={estilos.contenedorResumen}>
        <View style={estilos.itemResumen}>
          <Text style={estilos.tituloResumen}>Ingresos</Text>
          <Text style={[estilos.montoResumen, { color: TemaColores.colores.exito }]}>
            {formatearMoneda(totalIngresos)}
          </Text>
        </View>

        <View style={estilos.itemResumen}>
          <Text style={estilos.tituloResumen}>Gastos</Text>
          <Text style={[estilos.montoResumen, { color: TemaColores.colores.rojoPrimario }]}>
            {formatearMoneda(totalGastos)}
          </Text>
        </View>

        <View style={estilos.itemResumen}>
          <Text style={estilos.tituloResumen}>Balance</Text>
          <Text style={[
            estilos.montoResumen,
            { color: balance >= 0 ? TemaColores.colores.exito : TemaColores.colores.rojoPrimario }
          ]}>
            {formatearMoneda(balance)}
          </Text>
        </View>
      </View>

      {/* Lista de transacciones */}
      <FlatList
        data={transaccionesFiltradas}
        renderItem={renderItemTransaccion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={
          <View style={estilos.contenedorVacio}>
            <Text style={estilos.textoVacio}>No hay transacciones</Text>
          </View>
        }
      />

      {/* Modal de filtros */}
      <Modal
        visible={modalFiltrosVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalFiltrosVisible(false)}
      >
        <View style={estilos.modalFondo}>
          <View style={estilos.modalContenido}>
            <Text style={estilos.modalTitulo}>Filtrar historial</Text>

            <ScrollView>
              {/* Filtro por tipo */}
              <Text style={estilos.labelFiltro}>Tipo de transacción</Text>
              <View style={estilos.grupoOpciones}>
                {['todos', 'ingresos', 'gastos'].map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={[
                      estilos.opcionFiltro,
                      filtroSeleccionado === tipo && estilos.opcionSeleccionada
                    ]}
                    onPress={() => setFiltroSeleccionado(tipo)}
                  >
                    <Text style={[
                      estilos.textoOpcion,
                      filtroSeleccionado === tipo && estilos.textoOpcionSeleccionada
                    ]}>
                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Filtro por categoría */}
              <Text style={estilos.labelFiltro}>Categoría</Text>
              <View style={estilos.grupoOpciones}>
                {categorias.map((categoria) => (
                  <TouchableOpacity
                    key={categoria}
                    style={[
                      estilos.opcionFiltro,
                      categoriaSeleccionada === categoria && estilos.opcionSeleccionada
                    ]}
                    onPress={() => setCategoriaSeleccionada(categoria)}
                  >
                    <Text style={[
                      estilos.textoOpcion,
                      categoriaSeleccionada === categoria && estilos.textoOpcionSeleccionada
                    ]}>
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Botones del modal */}
            <View style={estilos.botonesModal}>
              <TouchableOpacity
                style={[estilos.botonModal, estilos.botonLimpiar]}
                onPress={limpiarFiltros}
              >
                <Text style={estilos.textoBotonModal}>Limpiar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[estilos.botonModal, estilos.botonAplicar]}
                onPress={aplicarFiltros}
              >
                <Text style={[estilos.textoBotonModal, { color: TemaColores.colores.textoBlanco }]}>
                  Aplicar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TemaColores.colores.fondoGrisClaro,
  },
  header: {
    backgroundColor: TemaColores.colores.azulPrimario,
    paddingHorizontal: TemaColores.espaciado.normal,
    paddingVertical: TemaColores.espaciado.grande,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: TemaColores.tipografia.tamañoGrande,
    fontWeight: TemaColores.tipografia.pesoNegrita,
    color: TemaColores.colores.textoBlanco,
  },
  botonFiltro: {
    backgroundColor: TemaColores.colores.fondoBlanco,
    paddingHorizontal: TemaColores.espaciado.normal,
    paddingVertical: TemaColores.espaciado.pequeño,
    borderRadius: TemaColores.bordes.radioPequeño,
  },
  textoBotonFiltro: {
    color: TemaColores.colores.azulPrimario,
    fontWeight: TemaColores.tipografia.pesoMedio,
  },
  contenedorResumen: {
    flexDirection: 'row',
    backgroundColor: TemaColores.colores.fondoBlanco,
    padding: TemaColores.espaciado.normal,
    marginBottom: TemaColores.espaciado.pequeño,
  },
  itemResumen: {
    flex: 1,
    alignItems: 'center',
  },
  tituloResumen: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoGris,
    marginBottom: TemaColores.espaciado.muyPequeño,
  },
  montoResumen: {
    fontSize: TemaColores.tipografia.tamañoMedio,
    fontWeight: TemaColores.tipografia.pesoNegrita,
  },
  lista: {
    padding: TemaColores.espaciado.normal,
  },
  itemTransaccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: TemaColores.colores.fondoBlanco,
    padding: TemaColores.espaciado.normal,
    borderRadius: TemaColores.bordes.radioMedio,
    marginBottom: TemaColores.espaciado.medio,
    ...TemaColores.sombras.pequeña,
  },
  itemIzquierda: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconoCategoria: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: TemaColores.espaciado.medio,
  },
  textoIcono: {
    fontSize: TemaColores.tipografia.tamañoGrande,
    fontWeight: TemaColores.tipografia.pesoNegrita,
    color: TemaColores.colores.textoBlanco,
  },
  infoTransaccion: {
    flex: 1,
  },
  nombreTransaccion: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    fontWeight: TemaColores.tipografia.pesoMedio,
    color: TemaColores.colores.textoOscuro,
    marginBottom: 2,
  },
  categoriaTransaccion: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoGris,
    marginBottom: 2,
  },
  fechaTransaccion: {
    fontSize: TemaColores.tipografia.tamañoMuyPequeño,
    color: TemaColores.colores.textoGrisClaro,
  },
  itemDerecha: {
    alignItems: 'flex-end',
  },
  montoTransaccion: {
    fontSize: TemaColores.tipografia.tamañoMedio,
    fontWeight: TemaColores.tipografia.pesoNegrita,
  },
  contenedorVacio: {
    padding: TemaColores.espaciado.enorme,
    alignItems: 'center',
  },
  textoVacio: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    color: TemaColores.colores.textoGris,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContenido: {
    backgroundColor: TemaColores.colores.fondoBlanco,
    borderTopLeftRadius: TemaColores.bordes.radioGrande,
    borderTopRightRadius: TemaColores.bordes.radioGrande,
    padding: TemaColores.espaciado.grande,
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: TemaColores.tipografia.tamañoGrande,
    fontWeight: TemaColores.tipografia.pesoNegrita,
    color: TemaColores.colores.textoOscuro,
    marginBottom: TemaColores.espaciado.grande,
  },
  labelFiltro: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    fontWeight: TemaColores.tipografia.pesoMedio,
    color: TemaColores.colores.textoOscuro,
    marginBottom: TemaColores.espaciado.medio,
    marginTop: TemaColores.espaciado.normal,
  },
  grupoOpciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TemaColores.espaciado.pequeño,
  },
  opcionFiltro: {
    paddingHorizontal: TemaColores.espaciado.normal,
    paddingVertical: TemaColores.espaciado.pequeño,
    borderRadius: TemaColores.bordes.radioPequeño,
    backgroundColor: TemaColores.colores.fondoGris,
    marginRight: TemaColores.espaciado.pequeño,
    marginBottom: TemaColores.espaciado.pequeño,
  },
  opcionSeleccionada: {
    backgroundColor: TemaColores.colores.azulPrimario,
  },
  textoOpcion: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoOscuro,
  },
  textoOpcionSeleccionada: {
    color: TemaColores.colores.textoBlanco,
    fontWeight: TemaColores.tipografia.pesoMedio,
  },
  botonesModal: {
    flexDirection: 'row',
    gap: TemaColores.espaciado.medio,
    marginTop: TemaColores.espaciado.grande,
  },
  botonModal: {
    flex: 1,
    height: TemaColores.dimensiones.alturaBotonPequeño,
    borderRadius: TemaColores.bordes.radioMedio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonLimpiar: {
    backgroundColor: TemaColores.colores.fondoGris,
  },
  botonAplicar: {
    backgroundColor: TemaColores.colores.azulPrimario,
  },
  textoBotonModal: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    fontWeight: TemaColores.tipografia.pesoMedio,
    color: TemaColores.colores.textoOscuro,
  },
});

export default Historial;