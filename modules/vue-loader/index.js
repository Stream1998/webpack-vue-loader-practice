const regEnter = /\r\n/g;
const regTemplate = /\<template\>(.*?)\<\/template\>/;
const regScript = /\<script\>(.*?)\<\/script\>/;
const regFirstBracket = /({)/;

module.exports = function (source) {
	const _source = source.replace(regEnter, '');
	const template = _source.match(regTemplate)[1];
	const script = _source.match(regScript)[1];
	const finalScript = script.replace(regFirstBracket, '$1 template:' + '`' + template + '`,');
	return finalScript;
}