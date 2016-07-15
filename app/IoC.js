import requireDir from 'require-dir'
import controllers from './Controllers'
import managers from './Managers'
import repositories from './Repositories'
import validators from './Validators'
import entities from './Entities'

import RouteResource from './Helpers/RouteResource'
import HomeController from './Controllers/HomeController'

class IoC
{
    constructor(){}

    get layers()
    {
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

    get services()
    {
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

    get classes()
    {
        return {
            'Controller': controllers,
            'Manager': managers,
            'Repository': repositories,
            'Validator': validators,
            'Entity': entities
        }
    }

    create(classType)
    {
        if(this.services.hasOwnProperty(classType))
        {
            var dependencies = this.services[classType].dependencies || []
            dependencies = dependencies.map((dependency) => this.create(dependency) )

            if(IoC.isClass(this.services[classType].class))
            {
                return Reflect.construct(this.services[classType].class, dependencies)
            }
            else
            {
                console.log(classType, 'no es clase')
                return this.services[classType].class
            }
        }
        else
        {
            return classType;
        }
    }

    createLayer(type , name)
    {
        if(this.layers.hasOwnProperty(type))
        {
            var dependencies = this.layers[type].dependencies.map((dependency) => this.createLayer(dependency , name) )

            if(IoC.isClass(this.classes[type][name]))
            {
                return Reflect.construct(this.classes[type][name], dependencies)
            }
            else
            {
                return this.classes[type][name]
            }
        }
        else { return null; }
    }

    static isClass(fn)
    {
        return typeof fn === 'function' && /^(?:class\s+|function\s+(?:_class|_default|[A-Z]))/.test(fn);
    }
}



export default new IoC()