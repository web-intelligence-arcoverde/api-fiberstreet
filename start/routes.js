'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Greetings GZ NET DESGRAAAÇAAAAAAAAAAAA in JSON' };
});

Route.get('download/:id', 'FileController.show');

Route.post('sessions', 'SessionController.store').validator('Session');
Route.post('users', 'UserController.store').validator('User');
// Create user nd provider
Route.post('users/provider', 'ProviderUserController.store'); // .validator('User')

Route.post('passwords', 'ForgotPasswordController.store');
Route.put('passwords', 'ForgotPasswordController.update');

Route.group(() => {
  Route.get('/files/:id', 'FileController.show');
  Route.post('/files', 'FileController.store');

  Route.get('roles', 'RoleController.index');
  Route.resource('providers', 'ProviderController')
    .apiOnly()
    .validator(
      new Map([[['providers.store', 'providers.update'], ['Provider']]])
    );
});

Route.group(() => {
  Route.post('invites', 'InviteController.store')
    .validator('Invite')
    .middleware('can:invites_create');

  Route.resource('fiberfusions', 'FiberFusionController').apiOnly();
  Route.get('fibers/cable/:id', 'FiberCableController.show');
  Route.get('cables/ceo/:id', 'CableCeoController.show');
  Route.get('cables/cto/:id', 'CableCtoController.show');

  Route.resource('splittercto', 'SplitterCtoController').apiOnly();
  //.middleware(new Map([[['splittercto'], ['can:map-modify']]]))

  Route.resource('splitters', 'SplitterController').apiOnly();
  //.middleware(new Map([[['splitters.store', 'splitters.update', 'splitter.destroy'], ['can:map-modify']]]))
  Route.get('splitteroutcto/:id', 'SplitterOutputCtoController.show');

  Route.get('drops/:id', 'DropController.show');
  Route.post('drops', 'DropController.store');

  Route.get('splitterout/client/:id', 'SplitterOutputClientController.show');
  Route.get('clients/splitter/:id', 'SplitterOutputClientController.index');

  Route.get('permissions', 'PermissionController.show');
  Route.get('members', 'MemberController.index');
  Route.put('members/:id', 'MemberController.update').middleware(
    'is:administrator'
  );
});

/** Relationships */
Route.group(() => {
  // Save cable in relationship with cto or ceo
  Route.post('cables/relationship', 'CableRelationshipController.store');
  Route.put('cables/relationship/:id', 'CableRelationshipController.update');
  Route.delete(
    'cables/relationship/:id/:objectType/:objectId',
    'CableRelationshipController.destroy'
  );
});
/** Spreadsheets */
Route.group(() => {
  Route.get('spreadsheets/ceo/:id', 'SpreadsheetCeoController.show');
  Route.post('spreadsheets', 'SpreadsheetController.store');
  Route.put('spreadsheets/ceo/:id', 'SpreadsheetController.update');
  Route.delete('spreadsheets/ceo/:id', 'SpreadsheetController.destroy');
  Route.resource('spreadsheetlinks', 'SpreadsheetLinkController').apiOnly();
});

/** Layers modification group */
Route.group(() => {
  Route.resource('cables', 'CableController')
    .apiOnly()
    .middleware(
      new Map([
        [
          ['cables.store', 'cables.update', 'cables.destroy'],
          ['can:map-modify'],
        ],
      ])
    );
  // .validator(new Map([[['cables.store', 'cables.update'], ['Cable']]]))

  Route.resource('ctos', 'CtoController')
    .apiOnly()
    .middleware(
      new Map([
        [['ctos.store', 'ctos.destroy'], ['can:map-modify']],
        [['ceos.update'], ['can:ceo_cto_mod']],
      ])
    );
  Route.resource('ceos', 'CeoController')
    .apiOnly()
    .middleware(
      new Map([
        [['ceos.store', 'ceos.destroy'], ['can:map-modify']],
        [['ceos.update'], ['can:ceo_cto_mod']],
      ])
    );
  Route.resource('fibers', 'FiberController').apiOnly();
  // .middleware(
  //   new Map([
  //     [
  //       'fibers.index',
  //       'fibers.store',
  //       'fibers.show',
  //       'fibers.update',
  //       'fibers.destroy'
  //     ]
  //   ])
  // )
  Route.resource('clients', 'ClientController')
    .apiOnly()
    .middleware(
      new Map([
        [['clients.store', 'clients.destroy'], ['can:map-modify']],
        [['clients.update'], ['can:ceo_cto_mod']],
      ])
    );
});

/**
 * GeoJSON Routes
 */
Route.group(() => {
  Route.get('cables', 'CableGeoJsonController.index');
  Route.get('clients', 'ClientGeoJsonController.index');
  Route.get('ctos', 'CtoGeoJsonController.index');
  Route.get('ceos', 'CeoGeoJsonController.index');
}).prefix('gj');

/** Route to obtain spreadsheet download */
Route.group(() => {
  Route.get('spreadsheets/:id/:slug', 'SpreadsheetController.show');
}).middleware(['spreadsheet']);

/** Route for import/exports by geojson */
Route.group(() => {
  // Route.route('imports', 'ImportLayerController', ['POST'])
  Route.post('imports', 'ImportLayerController.store'); // .validator('ImportLayer')
  Route.post('import', 'ImportLayerController.store').formats(['xml'], true);
});
