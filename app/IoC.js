import requireDir from 'require-dir'
import controllers from './Controllers'
import managers from './Managers'
import repositories from './Repositories'
import validators from './Validators'
import entities from './Entities'

import RouteResource from './Helpers/RouteResource'
import HomeController from './Controllers/HomeController'

/**
 *
 */
class IoC
{
    /**
     *
     */
    constructor(){}

    /**
     *
     * @returns {{Controller: {dependencies: string[]}, Manager: {dependencies: string[]}, Validator: {dependencies: string[]}, Repository: {dependencies: string[]}, Entity: {dependencies: Array}}}
     */
    get layers() {
        return {
            Controller: {
                dependencies: [
                    'Repository',
                    'Manager'
                ]
            },
            Manager: {
                dependencies: [
                    'Validator',
                    'Entity'
                ]
            },
            Validator: {
                dependencies: [
                    'Entity'
                ]
            },
            Repository: {
                dependencies: [
                    'Entity'
                ]
            },
            Entity: {
                dependencies: []
            }
        }
    }

    /**
     *
     * @returns {{RouteResource: {class: RouteResource, dependencies: Array}, HomeController: {class: HomeController}}}
     */
    get services() {
        return {
            RouteResource: {
                class: RouteResource,
                dependencies: []
            },
            HomeController: {
                class: HomeController
            }
            /*Routes: {
                class: Routes,
                dependencies: []
            }*/
        }
    }

    /**
     *
     * @returns {{Controller: {Product}, Manager: {Product}, Repository: {Product}, Validator: {Product}, Entity: {Product}}}
     */
    get classes() {
        return {
            'Controller': controllers,
            'Manager': managers,
            'Repository': repositories,
            'Validator': validators,
            'Entity': entities
        }
    }

    /**
     *
     * @param classType
     * @returns {*}
     */
    create(classType) {
        if (!this.services.hasOwnProperty(classType)) {
            return classType;
        }

        var dependencies = this.services[classType].dependencies || [];
        dependencies = dependencies.map((dependency) => this.create(dependency));

        if (IoC.isClass(this.services[classType].class)) {
            return Reflect.construct(this.services[classType].class, dependencies);
        }

        return this.services[classType].class;
    }

    /**
     *
     * @param type
     * @param name
     * @returns {*}
     */
    createLayer(type , name) {
        if(!this.layers.hasOwnProperty(type)) {
            return null;
        }

        var dependencies = this.layers[type].dependencies.map((dependency) => this.createLayer(dependency , name));

        if (IoC.isClass(this.classes[type][name])) {
            return Reflect.construct(this.classes[type][name], dependencies);
        }

        return this.classes[type][name];
    }

    /**
     *
     * @param fn
     * @returns {boolean}
     */
    static isClass(fn) {
        return typeof fn === 'function' && /^(?:class\s+|function\s+(?:_class|_default|[A-Z]))/.test(fn);
    }
}

export default new IoC();