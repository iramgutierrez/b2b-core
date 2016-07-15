import Product from './modules/Product'
import RouteResource from './Helpers/RouteResource'
import HomeController from './modules/Home/HomeController'

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
            'Product': Product
        }
    }

    /**
     *
     * @param classType
     * @returns {*}
     */
    create(classType) {
        if (this.services.hasOwnProperty(classType)) {
            var dependencies = this.services[classType].dependencies || [];
            dependencies = dependencies.map((dependency) => this.create(dependency));

            if (IoC.isClass(this.services[classType].class)) {
                return Reflect.construct(this.services[classType].class, dependencies);
            }
            return this.services[classType].class;
        }

        return classType;
    }

    /**
     *
     * @param type
     * @param name
     * @returns {*}
     */
    createLayer(type , name) {
        if(this.layers.hasOwnProperty(type)) {

            var dependencies = this.layers[type].dependencies.map((dependency) => this.createLayer(dependency , name));
            var className = name+type;

            if (IoC.isClass(this.classes[name][className])) {
                return Reflect.construct(this.classes[name][className], dependencies);
            }

            return this.classes[name][className];
        }

        return null;
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