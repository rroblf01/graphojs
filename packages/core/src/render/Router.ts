import type { Set as GoSet } from '../collections/Set.ts';
import type { Diagram } from '../diagram/Diagram.ts';
import type { Group } from '../parts/Group.ts';
import type { Link } from '../parts/Link.ts';

/**
 * GoJS-compatible: abstract base class for a pluggable link-routing
 * strategy, mirroring real GoJS's `Router`. graphojs's own rendering
 * already computes link paths per `Link.routing`/`avoidObstacles`
 * (`render/LinkRouter.ts`'s route* functions) rather than delegating to an
 * instantiable Router — subclassing this and overriding `routeLinks` lets
 * ported GoJS code plug into that decision instead of the individual
 * per-link flags, but graphojs itself doesn't consult a `Router` instance
 * anywhere in its own rendering path.
 */
export abstract class Router {
  name = '';
  isEnabled = true;
  isRealtime = false;
  private _diagram: Diagram | null = null;

  get diagram(): Diagram | null {
    return this._diagram;
  }

  set diagram(value: Diagram | null) {
    this._diagram = value;
  }

  /** Request that routes be recomputed; the default just invalidates the diagram. */
  invalidateRouter(): void {
    this._diagram?.invalidate();
  }

  /** Whether this router applies to the given container at all. Default: `isEnabled`. */
  canRoute(_container: Diagram | Group): boolean {
    return this.isEnabled;
  }

  /** Whether this router should route the given link. Default: always. */
  isRoutable(_link: Link, _container: Diagram | Group): boolean {
    return true;
  }

  /** Route every link in `links`, within `container`. Must be overridden. */
  abstract routeLinks(links: GoSet<Link>, container: Diagram | Group): void;
}
