'use strict';

const knex = appRequire('init/knex').knex;

const add = (name, host, hostname, port, password, method) => {
  return knex('server').insert({
    name,
    host,
    hostname,
    port,
    password,
    method,
  });
};

const del = (id) => {
  return knex.transaction(trx => {
    return knex('server').transacting(trx).where({ id }).delete()
    .then(() => {
      return knex('saveFlow').transacting(trx).where({ id }).delete();
    })
    .then(trx.commit)
    .catch(trx.rollback);
  });
};

const edit = (id, name, host, hostname, port, password, method) => {
  return knex('server').where({ id }).update({
    name,
    host,
    hostname,
    port,
    password,
    method,
  });
};

const list = () => {
  return knex('server').select(['id', 'name', 'host', 'hostname', 'port', 'password', 'method']).orderBy('name');
};

exports.add = add;
exports.del = del;
exports.edit = edit;
exports.list = list;
