# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.1.1 (2026-06-30)


### Features

* **#10:** cambiar pestaña inicial del Panel Docente a Recursos ([48d2132](https://github.com/erickadade/sophIA/commit/48d21324ae1b71ff9cce245496fc51eee27563bc)), closes [#10](https://github.com/erickadade/sophIA/issues/10)
* **#11:** agregar acción Visualizar en tabla de Recursos del Panel Docente ([7bc4278](https://github.com/erickadade/sophIA/commit/7bc427810a97838b84f49066f5a01198698a430e)), closes [#11](https://github.com/erickadade/sophIA/issues/11)
* **#12:** ordenar tabla de Recursos por Título, Tipo y Autor ([395e2c8](https://github.com/erickadade/sophIA/commit/395e2c81718a07788769bfcc4ed9128dd0823190)), closes [#12](https://github.com/erickadade/sophIA/issues/12)
* **#13:** registrar fechaCreacion/fechaActualizacion en recursos y mostrarlas en la tabla ([1bd1fde](https://github.com/erickadade/sophIA/commit/1bd1fde8d2b7dad5d19ad139d5e628a3a221c29e)), closes [#13](https://github.com/erickadade/sophIA/issues/13)
* **#14:** agregar buscador de recursos en el Panel Docente ([934fc78](https://github.com/erickadade/sophIA/commit/934fc78ecaeeacbb1d03b592da2c5fc4863ceda9)), closes [#14](https://github.com/erickadade/sophIA/issues/14)
* **#15:** reemplazar nombre+salir por menú dropdown de usuario ([36b4537](https://github.com/erickadade/sophIA/commit/36b45370554f13782e219a221d69b4df64fd97ba)), closes [#15](https://github.com/erickadade/sophIA/issues/15)
* **#19:** agregar splash screen con animación y tiempo mínimo de 1.2s ([734baa4](https://github.com/erickadade/sophIA/commit/734baa4725d674ba97a90f3069ef5e7dca533002)), closes [#19](https://github.com/erickadade/sophIA/issues/19)
* **#6:** adaptar vistas y componentes a autorIds[] ([204e99f](https://github.com/erickadade/sophIA/commit/204e99f632de9b23ca0024ba5e2b8aee78b3f969)), closes [#6](https://github.com/erickadade/sophIA/issues/6)
* **#6:** migrar campo autorId a autorIds[] en seedData.js ([346867b](https://github.com/erickadade/sophIA/commit/346867be7132b9a6ab207e1ee8ffc9620f27ba4e)), closes [#6](https://github.com/erickadade/sophIA/issues/6)
* **#6:** reemplazar select simple por multi-select con chips en RecursoModal ([d33ebbb](https://github.com/erickadade/sophIA/commit/d33ebbb56fae85ded25463e2b8787d2f9d08aec5)), closes [#6](https://github.com/erickadade/sophIA/issues/6)
* **#7:** buscador y badge de tipo en lista de recursos relacionados ([c66a2ca](https://github.com/erickadade/sophIA/commit/c66a2caee8fff9eba14d400a3a3488f74370df10)), closes [#7](https://github.com/erickadade/sophIA/issues/7)
* agregar tipos de recurso instagram, facebook e imagen ([fb2ac0d](https://github.com/erickadade/sophIA/commit/fb2ac0ddc57d1c5b9891aa50661427e7379e49fd))
* autodetectar URL de embed para video, tiktok, instagram y facebook ([3e697a3](https://github.com/erickadade/sophIA/commit/3e697a3b4d6782aacbc14cc57a9ae7be86199d8e))
* embeber PDFs e imágenes de Google Drive en EmbedViewer ([3e2096f](https://github.com/erickadade/sophIA/commit/3e2096f18c4a02a64eabf05708327c7fe0421f93))


### Bug Fixes

* **#18:** corregir autor precargado al abrir modal Nuevo recurso ([2b44de6](https://github.com/erickadade/sophIA/commit/2b44de682e3a9c8456cbf8b58b06592cb24984b9)), closes [#18](https://github.com/erickadade/sophIA/issues/18)
* actualizar action-hosting-deploy a v1 en ambos workflows ([28f170c](https://github.com/erickadade/sophIA/commit/28f170c6442e6bf5a68f5ea025e451116a1052d5))
* agregar variables de entorno de Firebase al build en GitHub Actions ([8e5b87c](https://github.com/erickadade/sophIA/commit/8e5b87ce117a3554240a828a11ebb2ca570fd106))
* deployar PRs a canal de preview en vez de live ([af14b8c](https://github.com/erickadade/sophIA/commit/af14b8cac1111b4466f89e862c898feeb1916f64))
* media queries mobile para modales, formularios y perfiles ([50d16bf](https://github.com/erickadade/sophIA/commit/50d16bffa7f4d7ae3fb0d964621453131b39e78a))
* navbar responsive con menú hamburguesa ([5f10f73](https://github.com/erickadade/sophIA/commit/5f10f7300e2a063b5d3c96295e334b66edbd73e5))
* reducir padding lateral de page-content en mobile ([48eb129](https://github.com/erickadade/sophIA/commit/48eb129dba65f83792cdaee67f1eea9a9244ce1e))
* revertir a action-hosting-deploy@v0 con continue-on-error ([74bfece](https://github.com/erickadade/sophIA/commit/74bfece4ddb6cc387c941274f4cdceb34c7e10a3))
